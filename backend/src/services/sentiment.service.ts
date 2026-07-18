import { GoogleGenerativeAI } from '@google/generative-ai'

const getModel = () => {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey || apiKey === 'your-gemini-api-key') {
    return null
  }
  const genAI = new GoogleGenerativeAI(apiKey)
  return genAI.getGenerativeModel({ model: 'gemini-flash-latest' })
}

export async function analyzeSentiment(text: string): Promise<{ score: number, label: 'positive'|'negative'|'neutral', summary: string }> {
  const model = getModel()
  if (!model) {
    // Mock response if API key is missing
    return {
      score: 0.8,
      label: 'positive',
      summary: 'The user expressed generally positive sentiments.'
    }
  }

  const prompt = `
Analyze the sentiment of the following review text. 
Return ONLY valid JSON with this exact structure:
{
  "score": number, // between 0.0 and 1.0 where 1.0 is highly positive
  "label": "positive" | "negative" | "neutral",
  "summary": "A one sentence summary of the review's core sentiment"
}

Review text: "${text}"
`

  try {
    const result = await model.generateContent(prompt)
    const responseText = result.response.text()
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    
    if (!jsonMatch) {
      throw new Error('Invalid AI response format')
    }
    
    return JSON.parse(jsonMatch[0])
  } catch (error) {
    console.error('Sentiment Analysis Error:', error)
    return {
      score: 0.5,
      label: 'neutral',
      summary: 'Failed to analyze sentiment.'
    }
  }
}
