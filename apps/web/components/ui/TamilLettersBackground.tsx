'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// A collection of classic Tamil letters (vowels and consonants)
const TAMIL_LETTERS = [
  'அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ',
  'க', 'ங', 'ச', 'ஞ', 'ட', 'ண', 'த', 'ந', 'ப', 'ம', 'ய', 'ர', 'ல', 'வ', 'ழ', 'ள', 'ற', 'ன'
]

interface FloatingLetter {
  id: number
  char: string
  startX: number
  startY: number
  duration: number
  delay: number
  scale: number
  opacity: number
}

export default function TamilLettersBackground() {
  const [letters, setLetters] = useState<FloatingLetter[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Generate 15 random letters to float around
    const newLetters: FloatingLetter[] = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      char: TAMIL_LETTERS[Math.floor(Math.random() * TAMIL_LETTERS.length)],
      startX: Math.random() * 100, // percentage vw
      startY: Math.random() * 100, // percentage vh
      duration: Math.random() * 30 + 30, // 30-60s slow float
      delay: Math.random() * 5,
      scale: Math.random() * 1.5 + 0.8, // 0.8x to 2.3x size
      opacity: Math.random() * 0.06 + 0.04 // 4% to 10% opacity for better visibility
    }))
    
    setLetters(newLetters)
  }, [])

  if (!isClient) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden">
      {letters.map((letter) => (
        <motion.div
          key={letter.id}
          className="absolute font-tamil text-granite-400 select-none"
          style={{
            left: `${letter.startX}vw`,
            top: `${letter.startY}vh`,
            fontSize: `${letter.scale * 4}rem`,
            opacity: letter.opacity,
          }}
          animate={{
            y: [0, -100, 100, 0],
            x: [0, 50, -50, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: letter.duration,
            repeat: Infinity,
            ease: "linear",
            delay: letter.delay
          }}
        >
          {letter.char}
        </motion.div>
      ))}
    </div>
  )
}
