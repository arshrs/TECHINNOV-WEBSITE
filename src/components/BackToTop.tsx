import React, { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { ArrowUp } from 'lucide-react'

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsVisible(latest > 500)
    })

    return () => unsubscribe()
  }, [scrollY])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-[#0066FF] to-[#3b82f6] text-white shadow-2xl shadow-[#0066FF]/30 flex items-center justify-center cursor-pointer group"
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowUp className="w-6 h-6" />
      </motion.div>
      
      {/* Pulse ring effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-[#0066FF]"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
    </motion.button>
  )
}