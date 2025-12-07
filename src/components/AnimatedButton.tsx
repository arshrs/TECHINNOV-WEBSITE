import React, { ReactNode } from 'react'
import { motion } from 'motion/react'
import { Button } from './ui/button'

interface AnimatedButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export function AnimatedButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button'
}: AnimatedButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-[#0066FF] to-[#0047b3] text-white hover:shadow-2xl hover:shadow-[#0066FF]/30',
    secondary: 'bg-white border-2 border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF] hover:text-white',
    outline: 'border-2 border-slate-300 text-slate-700 hover:border-[#0066FF] hover:text-[#0066FF] bg-white/80'
  }

  const sizes = {
    sm: 'h-12 px-6 text-base',
    md: 'h-14 px-8 text-lg',
    lg: 'h-16 sm:h-[4.5rem] px-10 text-lg sm:text-xl'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
      <Button
        onClick={onClick}
        disabled={disabled}
        type={type}
        className={`group relative overflow-hidden ${variants[variant]} ${sizes[size]} rounded-2xl transition-all duration-500 ${className}`}
      >
        {/* Shimmer effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Content */}
        <span className="relative z-10 flex items-center gap-2 justify-center">
          {children}
        </span>
      </Button>
    </motion.div>
  )
}