import { motion } from 'motion/react'
import { Button } from './ui/button'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

interface CTAProps {
  onNavigate: (page: string) => void
}

export function CTA({ onNavigate }: CTAProps) {
  return (
    <section className="py-16 sm:py-24 md:py-32 lg:py-36 relative bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Simplified CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-[#0066FF] to-[#0047b3] rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3rem_3rem]" />
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl" />

              <div className="relative text-center space-y-8 sm:space-y-10">
                {/* Clear Headline */}
                <div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-white mb-5 sm:mb-6 tracking-tight px-4">
                    Ready to Grow
                    <br />
                    Your Business?
                  </h2>

                  <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-[700px] mx-auto leading-relaxed px-4">
                    Let's talk about your project. Free, no pressure.
                  </p>
                </div>

                {/* Big CTA Button - Mobile First */}
                <div className="flex flex-col gap-4 justify-center items-stretch pt-4 max-w-md mx-auto">
                  <Button
                    onClick={() => onNavigate('RequestProject')}
                    size="lg"
                    className="group relative overflow-hidden bg-white text-[#0066FF] hover:bg-slate-50 transition-all duration-300 h-16 sm:h-[4.5rem] px-8 rounded-2xl text-lg sm:text-xl w-full shadow-2xl hover:shadow-3xl touch-manipulation"
                  >
                    <span className="flex items-center gap-3 justify-center">
                      Start Your Free Call
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                  
                  <button
                    onClick={() => onNavigate('Portfolio')}
                    className="text-white hover:text-white/80 transition-colors text-base sm:text-lg flex items-center justify-center gap-2 group py-3 touch-manipulation"
                  >
                    <span>View Our Work</span>
                    <span className="group-hover:translate-x-1 transition-transform text-xl">→</span>
                  </button>
                </div>

                {/* Simple Trust Signals */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 sm:pt-10 border-t border-white/20 max-w-[800px] mx-auto">
                  {[
                    'Free consultation',
                    'Reply in 24 hours',
                    'No commitment needed'
                  ].map((text, i) => (
                    <div key={i} className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center">
                      <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0" />
                      <p className="text-base sm:text-lg text-white/90">{text}</p>
                    </div>
                  ))}
                </div>

                {/* Urgency */}
                <div className="pt-4">
                  <p className="text-sm sm:text-base text-white/70 flex items-center justify-center gap-2 flex-wrap">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span>Limited spots for new projects</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}