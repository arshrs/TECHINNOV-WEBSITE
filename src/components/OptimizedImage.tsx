import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  loading?: 'lazy' | 'eager'
}

export function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  objectFit = 'cover',
  loading,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px',
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  // Optimize Unsplash URLs with size parameters
  const optimizeImageUrl = (url: string) => {
    if (url.includes('unsplash.com')) {
      const params = new URLSearchParams()
      if (width) params.append('w', Math.ceil(width * 1.5).toString())
      if (height) params.append('h', Math.ceil(height * 1.5).toString())
      params.append('q', '75')
      params.append('fm', 'webp')
      params.append('fit', 'crop')
      params.append('auto', 'format')
      
      return `${url}${url.includes('?') ? '&' : '?'}${params.toString()}`
    }
    return url
  }

  const optimizedSrc = optimizeImageUrl(src)

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Blur placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
      )}

      {/* Actual image - only load when in view */}
      {isInView && (
        <motion.img
          src={optimizedSrc}
          alt={alt}
          className={`w-full h-full object-${objectFit}`}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
          loading={loading || (priority ? 'eager' : 'lazy')}
          onLoad={() => setIsLoaded(true)}
          width={width}
          height={height}
        />
      )}
    </div>
  )
}