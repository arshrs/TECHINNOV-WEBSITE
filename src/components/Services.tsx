import { motion } from 'motion/react'
import { Globe, Cpu, Wrench, Bot, CheckCircle2, Sparkles } from 'lucide-react'
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal'

export function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 md:py-32 lg:py-36 relative bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 right-0 w-96 h-96 bg-[#0066FF]/5 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Simple Header */}
          <ScrollReveal>
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <motion.div 
                className="inline-block mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-xs sm:text-sm uppercase tracking-wider text-[#0066FF] px-4 py-2 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/20 inline-flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  What We Do
                </span>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-slate-900 mb-6 tracking-tight px-4">
                Services That Grow
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#3b82f6]">
                  Your Business
                </span>
              </h2>

              <p className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-[700px] mx-auto leading-relaxed px-4">
                Pick what works best for you. We make it simple.
              </p>
            </div>
          </ScrollReveal>

          {/* Services Grid - Enhanced with Hover Effects */}
          <StaggerContainer className="grid grid-cols-1 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-20">
            {[
              {
                icon: Globe,
                title: 'Business Websites',
                description: 'Get a beautiful website that brings you customers.',
                benefits: [
                  'Works great on phones',
                  'Shows up on Google',
                  'Loads super fast',
                  'Easy to update yourself'
                ],
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Cpu,
                title: 'Web Apps',
                description: 'Custom tools to run your business better.',
                benefits: [
                  'Made just for your needs',
                  'Works from anywhere',
                  'Updates in real-time',
                  'Multiple people can use it'
                ],
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: Wrench,
                title: 'Custom Software',
                description: 'Big solutions for growing companies.',
                benefits: [
                  'Built exactly how you want',
                  'You own everything',
                  'Grows with your business',
                  'Connects to other tools'
                ],
                gradient: 'from-orange-500 to-red-500'
              },
              {
                icon: Bot,
                title: 'AI Assistants',
                description: 'Smart bots that help your customers 24/7.',
                benefits: [
                  'Answers instantly',
                  'Talks to many people at once',
                  'Sounds natural',
                  'Saves you money'
                ],
                gradient: 'from-green-500 to-emerald-500'
              }
            ].map((service, i) => (
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
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative h-full"
                >
                  <div className="relative p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white border-2 border-slate-200 shadow-lg group-hover:shadow-2xl group-hover:border-[#0066FF]/40 transition-all duration-500 h-full">
                    
                    {/* Hover Gradient Background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/5 to-[#3b82f6]/5 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={false}
                    />
                    
                    {/* Icon with animated background */}
                    <motion.div 
                      className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-[#0066FF]/10 to-[#3b82f6]/5 flex items-center justify-center mb-5 sm:mb-6 overflow-hidden"
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      />
                      <service.icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#0066FF] relative z-10 group-hover:scale-110 transition-transform duration-300" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl sm:text-2xl md:text-3xl text-slate-900 mb-3 sm:mb-4 relative">
                      {service.title}
                    </h3>
                    <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed mb-5 sm:mb-6 relative">
                      {service.description}
                    </p>

                    {/* Benefits with stagger animation */}
                    <ul className="space-y-3 sm:space-y-4 relative">
                      {service.benefits.map((benefit, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex items-start gap-3 text-base sm:text-lg text-slate-600"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#0066FF] flex-shrink-0 mt-1" />
                          <span>{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* What's Included - Enhanced */}
          <ScrollReveal delay={0.2}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative bg-gradient-to-br from-[#0066FF] to-[#3b82f6] rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 text-center shadow-2xl overflow-hidden"
            >
              {/* Animated background pattern */}
              <motion.div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }}
                animate={{
                  backgroundPosition: ['0px 0px', '30px 30px']
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <div className="max-w-[900px] mx-auto relative z-10">
                <h3 className="text-2xl sm:text-3xl md:text-4xl text-white mb-5 sm:mb-6">
                  Every Project Includes
                </h3>
                <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-10 leading-relaxed">
                  You always get these, no matter which service you choose.
                </p>

                {/* Included Items - Enhanced Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                  {[
                    {
                      title: 'Mobile Friendly',
                      desc: 'Works perfectly on all phones'
                    },
                    {
                      title: 'Google Ready',
                      desc: 'Built to rank in search'
                    },
                    {
                      title: 'Super Fast',
                      desc: 'Loads in seconds'
                    },
                    {
                      title: 'We Support You',
                      desc: 'We\'re here when you need us'
                    },
                    {
                      title: 'Free Updates',
                      desc: 'First month on us'
                    },
                    {
                      title: 'Training',
                      desc: 'We show you how to use it'
                    }
                  ].map((item, i) => (
                    <div key={i} className="text-center p-4">
                      <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-white mx-auto mb-3 sm:mb-4" />
                      <div className="text-base sm:text-lg md:text-xl text-white mb-2">{item.title}</div>
                      <div className="text-sm sm:text-base text-white/80">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}