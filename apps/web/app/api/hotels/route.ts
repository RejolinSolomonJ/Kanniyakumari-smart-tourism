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

    // Use Google Places API (Legacy) which is more reliable across basic API keys
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(textQuery)}&key=${GOOGLE_MAPS_API_KEY}`
    
    const response = await fetch(searchUrl, {
      method: 'GET'
    })

    const data = await response.json()

    if (data.error_message) {
      console.error("Google Maps API Error:", data.error_message)
      return NextResponse.json({ error: data.error_message }, { status: 500 })
    }

    if (!data.results || data.results.length === 0) {
      return NextResponse.json([]) // No results
    }

    // Map Google Places results to our Hotel structure
    const hotels = data.results.map((place: any) => {
      // Determine Type based on requested param first
      let type = typeParam === 'ALL' ? 'MID_RANGE' : typeParam;
      
      if (typeParam === 'ALL') {
        if (place.types?.includes('resort')) type = 'RESORT'
        else if (place.rating >= 4.5) type = 'LUXURY'
        else if (place.rating < 3.5) type = 'BUDGET'
        else if (place.types?.includes('lodging') && place.rating === 4.0) type = 'GOVERNMENT'
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
          `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&maxheight=800&photo_reference=${photo.photo_reference}&key=${GOOGLE_MAPS_API_KEY}`
        )
      }

      return {
        id: place.place_id,
        nameEn: place.name || 'Unknown Hotel',
        nameTa: place.name || 'Unknown Hotel',
        type: type,
        pricePerNight: pricePerNight,
        address: place.formatted_address,
        starRating: Math.floor(rating),
        images: images,
        amenities: ['AC', 'Wi-Fi', 'Restaurant', 'Parking'].slice(0, Math.max(1, Math.floor(rating))),
        phone: 'Available at Reception',
        website: null
      }
    })

    return NextResponse.json(hotels)

  } catch (error) {
    console.error("Error fetching hotels:", error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
