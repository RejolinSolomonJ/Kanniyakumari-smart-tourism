import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

    if (!GOOGLE_MAPS_API_KEY) {
      return NextResponse.json({ error: 'Missing API Key' }, { status: 500 })
    }

    const placeId = params.id

    // Use Google Places API (Legacy) Details to fetch website and URL
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=website,url,formatted_phone_number&key=${GOOGLE_MAPS_API_KEY}`
    
    const response = await fetch(detailsUrl, {
      method: 'GET'
    })

    const data = await response.json()

    if (data.error_message) {
      console.error("Google Maps API Details Error:", data.error_message)
      return NextResponse.json({ error: data.error_message }, { status: 500 })
    }

    if (!data.result) {
      return NextResponse.json({ error: 'Details not found' }, { status: 404 })
    }

    return NextResponse.json({
      website: data.result.website || null,
      googleMapsUrl: data.result.url || null,
      phone: data.result.formatted_phone_number || null
    })

  } catch (error) {
    console.error("Hotels Details API exception:", error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
