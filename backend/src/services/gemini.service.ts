import { GoogleGenerativeAI } from '@google/generative-ai'

const getModel = () => {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey || apiKey === 'your-gemini-api-key') {
    console.warn('⚠️ GEMINI_API_KEY is not set. Using simulated AI responses.')
    return null
  }
  const genAI = new GoogleGenerativeAI(apiKey)
  return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
}

export async function generateItinerary(params: {
  days: number
  budget: number
  travelType: string
  interests: string[]
  hotelPreference: string
  dietary: string
  language: string
  accessibility: boolean
}): Promise<any> {
  const model = getModel()
  if (!model) {
    // Generate simulated Kanyakumari itinerary
    return getSimulatedItinerary(params)
  }

  const prompt = `
You are an expert tourism planner for Kanyakumari, Tamil Nadu, India.
Generate a detailed ${params.days}-day travel itinerary.

Parameters:
- Budget: ₹${params.budget} total
- Travel Type: ${params.travelType}
- Interests: ${params.interests.join(', ')}
- Hotel: ${params.hotelPreference}
- Diet: ${params.dietary}
- Language: ${params.language === 'ta' ? 'Tamil' : 'English'}
- Accessibility: ${params.accessibility ? 'Required' : 'Not required'}

Respond ONLY with valid JSON in this exact structure:
{
  "title": "string",
  "summary": "string",
  "totalDays": number,
  "estimatedBudget": {
    "accommodation": number,
    "food": number,
    "transport": number,
    "tickets": number,
    "total": number
  },
  "days": [
    {
      "day": 1,
      "theme": "string",
      "slots": [
        {
          "time": "Morning|Afternoon|Evening|Night",
          "place": "string",
          "activity": "string",
          "duration": "string",
          "tips": "string",
          "estimatedCost": number
        }
      ]
    }
  ],
  "packingList": ["string"],
  "weatherNote": "string",
  "emergencyContacts": [
    { "name": "string", "phone": "string", "type": "string" }
  ]
}
`

  const result = await model.generateContent(prompt)
  const text = result.response.text()
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('Invalid AI response')
  return JSON.parse(jsonMatch[0])
}

export async function chatWithAssistant(params: {
  message: string
  language: string
  history: Array<{ role: string; content: string }>
}): Promise<string> {
  const model = getModel()
  if (!model) {
    return getSimulatedChatResponse(params.message, params.language)
  }

  const systemInstruction = `
You are the official AI Tourism Assistant for Kanyakumari,
Tamil Nadu Government Department of Tourism.
Only answer questions about: Kanyakumari tourism, destinations, 
transport, culture, food, safety, emergencies, hotels, festivals.
If asked unrelated questions, politely redirect to tourism topics.
Always be professional, helpful and accurate.
Respond in ${params.language === 'ta' ? 'Tamil' : 'English'}.
`

  const chat = model.startChat({
    history: params.history.map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.content }]
    })),
    systemInstruction
  })

  const result = await chat.sendMessage(params.message)
  return result.response.text()
}

function getSimulatedItinerary(params: any) {
  return {
    title: `Beautiful Kanyakumari Trip (${params.travelType})`,
    summary: `A wonderful ${params.days}-day tour covering Kanyakumari's top landmarks customized for ${params.interests.join(', ')} interests.`,
    totalDays: params.days,
    estimatedBudget: {
      accommodation: Math.round(params.budget * 0.4),
      food: Math.round(params.budget * 0.25),
      transport: Math.round(params.budget * 0.2),
      tickets: Math.round(params.budget * 0.05),
      total: Math.round(params.budget * 0.9)
    },
    days: Array.from({ length: params.days }, (_, idx) => ({
      day: idx + 1,
      theme: idx === 0 ? 'Wonders of Sunrise & Heritage' : 'Scenic Beaches & Waterfalls',
      slots: [
        {
          time: 'Morning',
          place: 'Kanyakumari Beach (Triveni Sangam)',
          activity: 'Watch the breathtaking sunrise at the confluence of three seas.',
          duration: '2 hours',
          tips: 'Reach by 5:30 AM for the best view.',
          estimatedCost: 0
        },
        {
          time: 'Afternoon',
          place: 'Vivekananda Rock Memorial & Thiruvalluvar Statue',
          activity: 'Take the ferry to the rock memorial and saint statue.',
          duration: '3 hours',
          tips: 'Ferry ticket counters close by 4:00 PM.',
          estimatedCost: 70
        },
        {
          time: 'Evening',
          place: 'Sunset View Point',
          activity: 'Relax and watch the golden sunset.',
          duration: '1.5 hours',
          tips: 'Great photography spot.',
          estimatedCost: 0
        }
      ]
    })),
    packingList: ['Sunglasses', 'Sunscreen', 'Comfortable walking shoes', 'Cotton clothes'],
    weatherNote: 'Warm and breezy. Best visited in early morning or late evening.',
    emergencyContacts: [
      { name: 'National Emergency', phone: '112', type: 'HELPLINE' },
      { name: 'Kanyakumari Tourist Office', phone: '04652-246276', type: 'TOURISM' }
    ]
  }
}

function getSimulatedChatResponse(message: string, language: string): string {
  const msg = message.toLowerCase()
  if (language === 'ta') {
    if (msg.includes('உதவி') || msg.includes('ஆபத்து') || msg.includes('மருத்துவமனை')) {
      return 'அவசர உதவிக்கு 112 அல்லது 108 ஐ தொடர்பு கொள்ளவும். கன்னியாகுமரி அரசு மருத்துவக் கல்லூரி மருத்துவமனை தொலைபேசி எண்: 04652-223201.'
    }
    return 'வணக்கம்! நான் உங்கள் கன்னியாகுமரி சுற்றுலா உதவியாளர். ஆன்லைன் முன்பதிவு, சிறந்த இடங்கள் மற்றும் திருவிழாக்கள் பற்றி என்னிடம் கேட்கலாம்.'
  } else {
    if (msg.includes('help') || msg.includes('emergency') || msg.includes('hospital')) {
      return 'For immediate emergency assistance, call 112 or 108. Government Medical College Hospital: 04652-223201.'
    }
    if (msg.includes('best time') || msg.includes('when to visit')) {
      return 'The best time to visit Kanyakumari is from October to March when the weather is pleasant and ideal for sightseeing and beach activities.'
    }
    return 'Hello! I am your Kanyakumari AI Tourism Assistant. Ask me about sightseeing, hotels, food trails, or emergency contacts!'
  }
}
