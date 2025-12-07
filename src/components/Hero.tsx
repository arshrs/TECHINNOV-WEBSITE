import { motion, useScroll, useTransform } from 'motion/react'
import { Button } from './ui/button'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'

interface HeroProps {
  onNavigate: (page: string) => void
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20 pb-8 sm:pt-24 sm:pb-12 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-30" />
      
      {/* Animated Electric Blue Gradient Accent */}
      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(1400px,100vw)] h-[800px] bg-gradient-to-b from-[#0066FF]/5 via-[#0066FF]/2 to-transparent blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#0066FF]/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#3b82f6]/10 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div 
        className="relative z-10 w-full px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-12"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-6 sm:space-y-10 lg:space-y-12"
          >
            {/* Badge with enhanced animation */}
            <div className="space-y-5 sm:space-y-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.25, 
                  delay: 0.05,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#0066FF]/10 to-[#3b82f6]/10 border border-[#0066FF]/20 cursor-default backdrop-blur-sm shadow-lg"
              >
                <motion.div 
                  className="w-2 h-2 rounded-full bg-[#0066FF]"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-sm sm:text-base text-slate-700">For Growing Businesses</span>
                <Sparkles className="w-4 h-4 text-[#0066FF]" />
              </motion.div>

              {/* Main Headline with stagger animation */}
              <motion.h1 
                className="text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight px-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <motion.span 
                  className="text-slate-900 block mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.2 }}
                >
                  Get More Customers
                </motion.span>
                <motion.span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#3b82f6] to-[#0066FF] block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.2 }}
                  style={{
                    backgroundSize: "200% auto",
                  }}
                >
                  With a Better Website
                </motion.span>
              </motion.h1>
              
              {/* Description with fade-in */}
              <motion.p 
                className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-[700px] mx-auto leading-relaxed px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.2 }}
              >
                We build websites that actually bring you business. No fluff, just results.
              </motion.p>
            </div>

            {/* Simple Features with stagger */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-2 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.2 }}
            >
              {[
                { text: "Fast & Modern", delay: 0 },
                { text: "Mobile Friendly", delay: 0.03 },
                { text: "Easy to Update", delay: 0.06 }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + item.delay, duration: 0.2 }}
                  whileHover={{ scale: 1.05, x: 5 }}
                >
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#0066FF] flex-shrink-0" />
                  <span className="text-base sm:text-lg text-slate-700">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div 
              className="flex flex-col gap-4 justify-center items-stretch pt-6 sm:pt-8 lg:pt-10 px-4 max-w-md sm:max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => onNavigate('RequestProject')}
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-[#0066FF] to-[#0047b3] text-white hover:shadow-2xl hover:shadow-[#0066FF]/30 transition-all duration-500 h-16 sm:h-[4.5rem] px-8 rounded-2xl text-lg sm:text-xl w-full glow-blue touch-manipulation"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="flex items-center gap-3 justify-center relative z-10">
                    Start Your Free Consultation
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-6 h-6" />
                    </motion.div>
                  </span>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => onNavigate('Portfolio')}
                  size="lg"
                  variant="outline"
                  className="group relative overflow-hidden border-2 border-slate-300 text-slate-700 hover:border-[#0066FF] hover:text-[#0066FF] bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-500 h-14 sm:h-16 px-8 rounded-2xl text-base sm:text-lg w-full shadow-apple-md hover:shadow-apple-lg touch-manipulation"
                >
                  <span className="flex items-center gap-3 justify-center">
                    View Our Work
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Signal */}
            <motion.div 
              className="pt-6 sm:pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              <p className="text-sm sm:text-base text-slate-500 flex items-center justify-center gap-2 flex-wrap px-4">
                <CheckCircle2 className="w-4 h-4 text-[#0066FF]" />
                <span>Mumbai-based • Expert support • Trusted by Indian businesses</span>
              </p>
            </motion.div>

            {/* Animated Scroll Indicator */}
            <motion.div 
              className="pt-8 sm:pt-10 lg:pt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.3 }}
            >
              <motion.button
                onClick={() => {
                  const element = document.getElementById('about')
                  element?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-slate-400 hover:text-[#0066FF] transition-colors text-sm sm:text-base flex items-center gap-2 mx-auto group touch-manipulation py-3"
                whileHover={{ y: 5 }}
              >
                <span>See How It Works</span>
                <motion.span 
                  className="text-[#0066FF] text-xl"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ↓
                </motion.span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  )
}