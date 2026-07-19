import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const typeParam = searchParams.get('type') || 'ALL'

    const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

    if (!GOOGLE_MAPS_API_KEY) {
      console.error("Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY")
      return NextResponse.json({ error: 'Missing API Key' }, { status: 500 })
    }

    let textQuery = "hotels resorts in Kanyakumari"
    switch(typeParam) {
      case 'GOVERNMENT': textQuery = "TTDC government hotels in Kanyakumari"; break;
      case 'RESORT': textQuery = "resorts in Kanyakumari"; break;
      case 'LUXURY': textQuery = "luxury 5 star hotels resorts in Kanyakumari"; break;
      case 'MID_RANGE': textQuery = "3 star hotels in Kanyakumari"; break;
      case 'BUDGET': textQuery = "budget cheap hotels in Kanyakumari"; break;
      case 'HOMESTAY': textQuery = "homestays guest houses in Kanyakumari"; break;
      case 'ALL':
      default: textQuery = "hotels resorts homestays in Kanyakumari"; break;
    }

    // Use Google Places API (New)
    const searchUrl = 'https://places.googleapis.com/v1/places:searchText'
    
    const response = await fetch(searchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.photos,places.primaryType,places.websiteUri'
      },
      body: JSON.stringify({
        textQuery: textQuery
      })
    })

    const data = await response.json()

    if (data.error) {
      console.error("Google Maps API Error:", data.error)
      return NextResponse.json({ error: data.error.message }, { status: 500 })
    }

    if (!data.places) {
      return NextResponse.json([]) // No results
    }

    // Map Google Places results to our Hotel structure
    const hotels = data.places.map((place: any) => {
      // Determine Type based on requested param first
      let type = typeParam === 'ALL' ? 'MID_RANGE' : typeParam;
      
      if (typeParam === 'ALL') {
        if (place.primaryType === 'resort') type = 'RESORT'
        else if (place.rating >= 4.5) type = 'LUXURY'
        else if (place.rating < 3.5) type = 'BUDGET'
        else if (place.primaryType === 'lodging' && place.rating === 4.0) type = 'GOVERNMENT'
      }

      // Calculate a realistic price based on rating
      const rating = place.rating || 3.0
      let pricePerNight = Math.floor(rating * 800)
      if (type === 'RESORT') pricePerNight += 1500
      if (type === 'LUXURY') pricePerNight += 2500

      // Round to nearest 500
      pricePerNight = Math.round(pricePerNight / 500) * 500

      // Get Photo
      let images = ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500'] // Fallback
      if (place.photos && place.photos.length > 0) {
        images = place.photos.slice(0, 1).map((photo: any) => 
          `https://places.googleapis.com/v1/${photo.name}/media?maxHeightPx=800&maxWidthPx=800&key=${GOOGLE_MAPS_API_KEY}`
        )
      }

      return {
        id: place.id,
        nameEn: place.displayName?.text || 'Unknown Hotel',
        nameTa: place.displayName?.text || 'Unknown Hotel',
        type: type,
        pricePerNight: pricePerNight,
        address: place.formattedAddress,
        starRating: Math.floor(rating),
        images: images,
        amenities: ['AC', 'Wi-Fi', 'Restaurant', 'Parking'].slice(0, Math.max(1, Math.floor(rating))),
        phone: 'Available at Reception',
        website: place.websiteUri || null
      }
    })

    return NextResponse.json(hotels)

  } catch (error) {
    console.error("Error fetching hotels:", error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
