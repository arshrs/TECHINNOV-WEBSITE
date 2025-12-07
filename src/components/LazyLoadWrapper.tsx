import React, { useEffect, useRef, useState, ReactNode } from 'react'

interface LazyLoadWrapperProps {
  children: ReactNode
  className?: string
  rootMargin?: string
  threshold?: number
  fallback?: ReactNode
}

/**
 * Lazy load wrapper that only renders children when visible in viewport
 * Great for performance on long pages with many sections
 */
export function LazyLoadWrapper({
  children,
  className = '',
  rootMargin = '100px',
  threshold = 0.01,
  fallback = null,
}: LazyLoadWrapperProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect() // Once visible, stop observing
          }
        })
      },
      {
        rootMargin,
        threshold,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [rootMargin, threshold])

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : fallback}
    </div>
  )
}