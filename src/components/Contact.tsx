import { motion } from 'motion/react'
import { Mail, Phone, MapPin, Sparkles } from 'lucide-react'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal'

interface ContactProps {
  onNavigate: (page: string) => void
}

export function Contact({ onNavigate }: ContactProps) {
  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 lg:py-36 relative bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute bottom-20 right-0 w-96 h-96 bg-[#0066FF]/5 rounded-full blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Enhanced Header */}
          <ScrollReveal>
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <motion.div 
                className="inline-block mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-xs sm:text-sm uppercase tracking-wider text-[#0066FF] px-4 py-2 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/20 inline-flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Contact Us
                </span>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-slate-900 mb-6 tracking-tight px-4">
                Let's Talk
              </h2>

              <p className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-[700px] mx-auto leading-relaxed px-4">
                We reply within 24 hours. Call, email, or message us.
              </p>
            </div>
          </ScrollReveal>

          {/* Contact Cards - Enhanced with micro-interactions */}
          <StaggerContainer className="grid grid-cols-1 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {[
              {
                icon: Phone,
                label: 'Call Us',
                value: '+91 86578 54711',
                href: 'tel:+918657854711',
                extra: '+91 73041 90805',
                extraHref: 'tel:+917304190805',
                description: 'Mon-Sat, 9 AM - 7 PM',
                gradient: 'from-green-500 to-emerald-500'
              },
              {
                icon: Mail,
                label: 'Email Us',
                value: 'team.techinnov@gmail.com',
                href: 'mailto:team.techinnov@gmail.com',
                description: 'Reply in 24 hours',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: MapPin,
                label: 'Visit Us',
                value: 'Mumbai, Maharashtra',
                extra: 'India',
                description: 'Serving all of India',
                gradient: 'from-purple-500 to-pink-500'
              }
            ].map((item, i) => (
              <StaggerItem
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.6 }}
                className="group relative"
              >
                <motion.div
                  whileHover={{ y: -5, scale: 1.01 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full"
                >
                  <div className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border-2 border-slate-200 bg-white group-hover:border-[#0066FF]/40 transition-all duration-500 shadow-lg group-hover:shadow-xl h-full relative overflow-hidden">
                    {/* Hover gradient background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/5 to-[#3b82f6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={false}
                    />
                    
                    <div className="flex items-start gap-4 sm:gap-6 relative">
                      {/* Enhanced Icon */}
                      <motion.div 
                        className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-[#0066FF]/10 to-[#3b82f6]/5 flex items-center justify-center relative overflow-hidden"
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                        />
                        <item.icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#0066FF] group-hover:scale-110 transition-transform duration-300" />
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg text-slate-500 mb-2">{item.label}</h3>
                        
                        {item.href ? (
                          <>
                            <a 
                              href={item.href}
                              className="block text-lg sm:text-xl md:text-2xl text-[#0066FF] hover:text-[#0047b3] transition-colors mb-1 break-all touch-manipulation"
                            >
                              {item.value}
                            </a>
                            {item.extra && item.extraHref && (
                              <a 
                                href={item.extraHref}
                                className="block text-lg sm:text-xl md:text-2xl text-[#0066FF] hover:text-[#0047b3] transition-colors mb-2 break-all touch-manipulation"
                              >
                                {item.extra}
                              </a>
                            )}
                          </>
                        ) : (
                          <>
                            <div className="text-lg sm:text-xl md:text-2xl text-slate-900 mb-1">{item.value}</div>
                            {item.extra && <div className="text-lg sm:text-xl text-slate-600 mb-2">{item.extra}</div>}
                          </>
                        )}
                        
                        <p className="text-sm sm:text-base text-slate-500">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Big CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center bg-gradient-to-br from-slate-50 to-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 border-2 border-slate-200 shadow-lg"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl text-slate-900 mb-4 sm:mb-5">
              Ready to Get Started?
            </h3>
            <p className="text-lg sm:text-xl text-slate-600 mb-8 sm:mb-10 max-w-[600px] mx-auto">
              Tell us about your project and we'll get back to you fast.
            </p>

            <Button
              onClick={() => onNavigate('RequestProject')}
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-[#0066FF] to-[#0047b3] text-white hover:shadow-2xl hover:shadow-[#0066FF]/30 transition-all duration-500 h-16 sm:h-[4.5rem] px-10 sm:px-14 rounded-2xl text-lg sm:text-xl w-full sm:w-auto glow-blue touch-manipulation"
            >
              <span className="flex items-center gap-3 justify-center">
                Start Your Project
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  )
}