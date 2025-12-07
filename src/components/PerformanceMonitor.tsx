import React, { useEffect } from 'react'

/**
 * Performance monitoring component
 * Logs performance metrics in development
 * Helps identify bottlenecks and slow pages
 */
export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') return

    // Wait for page to fully load
    window.addEventListener('load', () => {
      // Use Performance API
      if ('performance' in window) {
        const perfData = window.performance.timing
        const paintEntries = performance.getEntriesByType('paint')
        const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

        // Calculate metrics
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart
        const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.navigationStart
        const firstPaint = paintEntries.find(entry => entry.name === 'first-paint')?.startTime || 0
        const firstContentfulPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0
        const timeToInteractive = perfData.domInteractive - perfData.navigationStart

        // Log metrics in a nice format
        console.log('%c⚡ Performance Metrics', 'background: #00C8FF; color: black; padding: 8px; font-size: 14px; font-weight: bold; border-radius: 4px;')
        console.table({
          'First Paint (FP)': `${Math.round(firstPaint)}ms`,
          'First Contentful Paint (FCP)': `${Math.round(firstContentfulPaint)}ms`,
          'DOM Content Loaded': `${Math.round(domContentLoaded)}ms`,
          'Time to Interactive (TTI)': `${Math.round(timeToInteractive)}ms`,
          'Full Page Load': `${Math.round(pageLoadTime)}ms`,
        })

        // Performance score
        if (pageLoadTime < 1000) {
          console.log('%c✅ Excellent Performance (<1s)', 'color: #10b981; font-weight: bold;')
        } else if (pageLoadTime < 2000) {
          console.log('%c✅ Good Performance (<2s)', 'color: #3b82f6; font-weight: bold;')
        } else if (pageLoadTime < 3000) {
          console.log('%c⚠️ Moderate Performance (<3s)', 'color: #f59e0b; font-weight: bold;')
        } else {
          console.log('%c⚠️ Slow Performance (>3s) - Consider optimizing', 'color: #ef4444; font-weight: bold;')
        }

        // Resource timing
        const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
        const imageResources = resources.filter(r => r.initiatorType === 'img')
        const scriptResources = resources.filter(r => r.initiatorType === 'script')
        const cssResources = resources.filter(r => r.initiatorType === 'link' || r.initiatorType === 'css')

        console.log('\n%c📦 Resources Loaded', 'background: #8b5cf6; color: white; padding: 4px 8px; font-weight: bold; border-radius: 4px;')
        console.table({
          'Images': imageResources.length,
          'Scripts': scriptResources.length,
          'Stylesheets': cssResources.length,
          'Total Resources': resources.length,
        })

        // Slowest resources
        const slowResources = resources
          .sort((a, b) => b.duration - a.duration)
          .slice(0, 5)
          .map(r => ({
            name: r.name.split('/').pop() || r.name,
            duration: `${Math.round(r.duration)}ms`,
            size: r.transferSize ? `${Math.round(r.transferSize / 1024)}KB` : 'N/A'
          }))

        if (slowResources.length > 0) {
          console.log('\n%c🐌 Slowest Resources', 'background: #f59e0b; color: white; padding: 4px 8px; font-weight: bold; border-radius: 4px;')
          console.table(slowResources)
        }

        // Memory usage (if available)
        if ('memory' in performance) {
          const memory = (performance as any).memory
          console.log('\n%c💾 Memory Usage', 'background: #06b6d4; color: white; padding: 4px 8px; font-weight: bold; border-radius: 4px;')
          console.table({
            'Used': `${Math.round(memory.usedJSHeapSize / 1048576)}MB`,
            'Total': `${Math.round(memory.totalJSHeapSize / 1048576)}MB`,
            'Limit': `${Math.round(memory.jsHeapSizeLimit / 1048576)}MB`,
          })
        }

        // Connection info (if available)
        const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
        if (connection) {
          console.log('\n%c📡 Connection Info', 'background: #ec4899; color: white; padding: 4px 8px; font-weight: bold; border-radius: 4px;')
          console.table({
            'Type': connection.effectiveType || 'N/A',
            'Downlink': connection.downlink ? `${connection.downlink}Mbps` : 'N/A',
            'RTT': connection.rtt ? `${connection.rtt}ms` : 'N/A',
            'Save Data': connection.saveData ? 'ON' : 'OFF',
          })
        }

        // Device info
        console.log('\n%c📱 Device Info', 'background: #14b8a6; color: white; padding: 4px 8px; font-weight: bold; border-radius: 4px;')
        console.table({
          'User Agent': navigator.userAgent,
          'Platform': navigator.platform,
          'Language': navigator.language,
          'Online': navigator.onLine ? 'Yes' : 'No',
          'Cookies Enabled': navigator.cookieEnabled ? 'Yes' : 'No',
          'Screen Size': `${screen.width}x${screen.height}`,
          'Viewport Size': `${window.innerWidth}x${window.innerHeight}`,
          'Device Pixel Ratio': window.devicePixelRatio,
        })

        console.log('\n%c💡 Tip: Check the Network tab for detailed resource timing', 'color: #6b7280; font-style: italic;')
      }
    })
  }, [])

  return null // This component doesn't render anything
}