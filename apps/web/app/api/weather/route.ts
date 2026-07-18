import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

    if (!WEATHER_API_KEY) {
      console.error("Missing WEATHER_API_KEY");
      return NextResponse.json({ error: 'Missing API Key' }, { status: 500 });
    }

    // Fetch current weather for Kanyakumari
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kanyakumari&appid=${WEATHER_API_KEY}&units=metric`;
    
    const response = await fetch(weatherUrl);
    const data = await response.json();

    if (data.cod !== 200) {
      console.error("OpenWeatherMap API Error:", data);
      return NextResponse.json({ error: 'Failed to fetch from OpenWeatherMap' }, { status: 500 });
    }

    // Map to a clean response for the frontend widget
    const current = {
      temp: Math.round(data.main.temp),
      condition: data.weather[0].main,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // convert m/s to km/h
      iconCode: data.weather[0].icon
    };

    return NextResponse.json({ current });

  } catch (error) {
    console.error("Error fetching weather:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
