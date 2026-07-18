'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X, Send, Compass, MessageSquare, Phone, AlertCircle } from 'lucide-react'

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<any[]>([
    { role: 'model', content: 'Hello! I am your official Kanyakumari AI Tourism Assistant. How can I help you explore today?' }
  ])
  const [input, setInput] = useState('')
  const [lang, setLang] = useState<'en' | 'ta'>('en')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickQuestions = [
    { label: 'Top Beaches 🌊', query: 'Tell me about the best beaches in Kanyakumari' },
    { label: 'Ferry Timings 🚢', query: 'What are the Vivekananda Rock ferry timings?' },
    { label: 'Local Food 🍲', query: 'What local food should I try?' },
    { label: 'Emergency 🚨', query: 'Show me emergency help contacts' }
  ]

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleSend = async (messageText: string) => {
    if (!messageText.trim()) return
    
    const userMsg = { role: 'user', content: messageText }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    // Emergency redirection checks
    const lower = messageText.toLowerCase()
    if (lower.includes('accident') || lower.includes('lost') || lower.includes('emergency') || lower.includes('help') || lower.includes('hospital')) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'model',
          content: '⚠️ EMERGENCY DETECTED: For immediate assistance, please call the Kanyakumari Police Station at 04652-246947 or Medical Ambulance at 108. You can also view the Emergency Contacts dashboard.',
          isEmergency: true
        }])
        setIsLoading(false)
      }, 800)
      return
    }

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }))
      const res = await fetch('http://localhost:5000/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText, language: lang, history })
      })
      const data = await res.json()
      
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'model', content: data.reply }])
      } else {
        throw new Error('API failed')
      }
    } catch (err) {
      // Direct Gemini client-side fallback
      const clientApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
      if (clientApiKey) {
        try {
          const systemInstruction = `You are the official AI Tourism Assistant for Kanyakumari, Tamil Nadu Government Department of Tourism. Only answer questions about: Kanyakumari tourism, destinations, transport, culture, food, safety, emergencies, hotels, festivals. If asked unrelated questions, politely redirect to tourism topics. Always be professional, helpful and accurate. Respond in ${lang === 'ta' ? 'Tamil' : 'English'}.`
          
          const formattedContents = messages.map(m => ({
            role: m.role === 'model' ? 'model' : 'user',
            parts: [{ text: m.content }]
          }))
          formattedContents.push({ role: 'user', parts: [{ text: messageText }] })

          const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${clientApiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: formattedContents,
                systemInstruction: {
                  parts: [{ text: systemInstruction }]
                }
              })
            }
          )
          const geminiData = await geminiRes.json()
          const reply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text
          if (reply) {
            setMessages(prev => [...prev, { role: 'model', content: reply }])
            setIsLoading(false)
            return
          }
        } catch (apiErr) {
          console.error('Direct Gemini call failed:', apiErr)
        }
      }

      // Simulate answer offline if no key or API failed
      setTimeout(() => {
        const responseText = getOfflineAnswer(messageText, lang)
        setMessages(prev => [...prev, { role: 'model', content: responseText }])
        setIsLoading(false)
      }, 1000)
      return
    }
    setIsLoading(false)
  }

  const getOfflineAnswer = (query: string, language: string) => {
    const q = query.toLowerCase()
    if (language === 'ta') {
      if (q.includes('கடற்கரை')) return 'கன்னியாகுமரி கடற்கரை, சோத்தாவிளை கடற்கரை மற்றும் முட்டம் கடற்கரை ஆகியவை மிகவும் பிரபலமானவை.'
      if (q.includes('கோவில்') || q.includes('கோயில்')) return 'பகவதி அம்மன் கோவில் மற்றும் சுசீந்திரம் தாணுமாலயன் கோவில் ஆகியவை முக்கிய வழிபாட்டுத் தலங்களாகும்.'
      return 'மன்னிக்கவும், என் சேவையகம் ஆஃப்லைனில் உள்ளது. கன்னியாகுமரி சுற்றுலா தகவல்களுக்கு தயவுசெய்து எங்களின் வலைதள பக்கங்களை ஆராயவும்.'
    } else {
      if (q.includes('beach')) return 'Kanyakumari Beach (Triveni Sangam), Sothavilai Beach, and Muttom Beach are beautiful coastal spots to visit.'
      if (q.includes('ferry') || q.includes('rock')) return 'The ferry to Vivekananda Rock Memorial operates daily from 8:00 AM to 4:00 PM. General tickets cost ₹50.'
      if (q.includes('food') || q.includes('eat')) return 'You must try the Meen Kuzhambu (fish curry), Kothu Parotta, and refreshing Nannari Sarbath!'
      return 'I am currently operating in offline mode. Please feel free to ask about hotels, beaches, temple timings, or emergency contacts!'
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-gradient-gold text-granite-900 rounded-full flex items-center justify-center shadow-gold-glow cursor-pointer relative z-50 border border-gold-400"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6 animate-pulse" />}
      </motion.button>

      {/* Slide-Up Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="absolute bottom-18 right-0 w-88 md:w-96 h-128 bg-white rounded-2xl border border-granite-100 shadow-xl overflow-hidden flex flex-col justify-between"
          >
            {/* Header */}
            <div className="bg-gradient-ocean px-5 py-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold" />
                <div>
                  <h3 className="font-serif font-bold text-body-sm leading-none">Kumari AI Assistant</h3>
                  <span className="text-[10px] text-white/70">Official Dept of Tourism</span>
                </div>
              </div>

              {/* Lang Toggle */}
              <div className="flex bg-black/20 rounded-full p-0.5 border border-white/10 text-caption font-semibold">
                <button
                  onClick={() => setLang('en')}
                  className={`px-2 py-0.5 rounded-full transition-colors ${lang === 'en' ? 'bg-white text-ocean' : 'text-white/85'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang('ta')}
                  className={`px-2 py-0.5 rounded-full transition-colors ${lang === 'ta' ? 'bg-white text-ocean' : 'text-white/85'}`}
                >
                  தமிழ்
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3.5 rounded-2xl text-body-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-ocean text-white rounded-tr-none'
                        : m.isEmergency
                        ? 'bg-red-50 text-red-700 border border-red-200 rounded-tl-none font-medium'
                        : 'bg-granite-50 text-granite-750 border border-granite-100 rounded-tl-none'
                    }`}
                  >
                    {m.content}
                    {m.isEmergency && (
                      <div className="mt-3">
                        <a href="tel:108" className="btn-danger inline-flex items-center gap-2 py-1 px-3 text-caption font-semibold">
                          🚨 Call Ambulance
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-granite-50 p-3 rounded-2xl text-caption text-granite-400 animate-pulse">
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions & Input Area */}
            <div className="p-3 border-t border-granite-100 space-y-3 bg-granite-50/50">
              
              {/* Quick suggestions */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q.query)}
                      className="bg-white border border-granite-200 hover:border-ocean hover:text-ocean transition-all py-1.5 px-3 rounded-lg text-caption font-semibold text-granite-600 shadow-sm"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Message Input Form */}
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                className="flex bg-white rounded-xl border border-granite-200 p-1"
              >
                <input
                  type="text"
                  placeholder="Ask Kanyakumari AI..."
                  className="w-full bg-transparent border-0 ring-0 focus:ring-0 px-3 text-body-sm focus:outline-none"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="p-2 bg-ocean text-white rounded-lg hover:bg-ocean-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
