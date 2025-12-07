import React, { useEffect, useRef, useState } from 'react'
import { isMobileDevice, isSlowConnection, prefersReducedMotion } from '../utils/performance'

export function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const [shouldAnimate, setShouldAnimate] = useState(true)

  useEffect(() => {
    // Check if we should reduce animations for performance
    const isMobile = isMobileDevice()
    const isSlowConn = isSlowConnection()
    const reducedMotion = prefersReducedMotion()
    
    if (reducedMotion || (isMobile && isSlowConn)) {
      setShouldAnimate(false)
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { 
      alpha: false, // Better performance
      desynchronized: true // Better performance for animations
    })
    if (!ctx) return

    // Set canvas size with device pixel ratio for sharp rendering
    const dpr = Math.min(window.devicePixelRatio || 1, 2) // Cap at 2x for performance
    const rect = canvas.getBoundingClientRect()
    
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    
    ctx.scale(dpr, dpr)

    // Reduce particle count on mobile
    const particleCount = isMobile ? 25 : 50
    
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
    }> = []

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.3, // Slower movement for better performance
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1
      })
    }

    let lastTime = 0
    const targetFPS = isMobile ? 30 : 60 // Lower FPS on mobile
    const frameInterval = 1000 / targetFPS

    function animate(currentTime: number) {
      if (!ctx || !canvas) return

      const deltaTime = currentTime - lastTime

      // Throttle animation to target FPS
      if (deltaTime < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }

      lastTime = currentTime - (deltaTime % frameInterval)
      
      // Clear with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, rect.width, rect.height)

      // Draw and update particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x < 0) particle.x = rect.width
        if (particle.x > rect.width) particle.x = 0
        if (particle.y < 0) particle.y = rect.height
        if (particle.y > rect.height) particle.y = 0

        // Draw particle with glow
        ctx.fillStyle = '#00C8FF'
        ctx.shadowBlur = 10
        ctx.shadowColor = '#00C8FF'
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()

        // Draw connections (only check nearby particles for performance)
        const connectionDistance = isMobile ? 100 : 150
        
        particles.forEach((otherParticle, j) => {
          if (i === j || j <= i) return // Avoid duplicate lines
          
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.8
            ctx.strokeStyle = `rgba(0, 200, 255, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.shadowBlur = 5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    // Optimized resize handler with debouncing
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        const newRect = canvas.getBoundingClientRect()
        canvas.width = newRect.width * dpr
        canvas.height = newRect.height * dpr
        canvas.style.width = `${newRect.width}px`
        canvas.style.height = `${newRect.height}px`
        ctx.scale(dpr, dpr)
        
        // Update particle positions to fit new size
        particles.forEach(p => {
          p.x = Math.min(p.x, newRect.width)
          p.y = Math.min(p.y, newRect.height)
        })
      }, 250)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    
    // Pause animation when tab is not visible for performance
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      } else {
        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      clearTimeout(resizeTimeout)
    }
  }, [shouldAnimate])

  // Static gradient fallback for reduced motion
  if (!shouldAnimate) {
    return (
      <div 
        className="fixed top-0 left-0 w-full h-full -z-10"
        style={{
          background: 'linear-gradient(180deg, #000000 0%, #001a1a 50%, #000000 100%)'
        }}
      />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ 
        background: '#000000',
        willChange: 'contents', // Performance hint
      }}
    />
  )
}