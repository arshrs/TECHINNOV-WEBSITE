import { motion } from 'motion/react'
import { CheckCircle2, Phone, Send, Rocket } from 'lucide-react'

export function About() {
  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 lg:py-36 relative bg-white">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Simple Intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <div className="inline-block mb-6">
              <span className="text-xs sm:text-sm uppercase tracking-wider text-[#0066FF] px-4 py-2 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/20">
                Simple Process
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-slate-900 mb-6 tracking-tight px-4">
              How We Work
            </h2>

            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-[700px] mx-auto leading-relaxed px-4">
              Three simple steps to get your business online and growing.
            </p>
          </motion.div>

          {/* 3 Simple Steps - Mobile First */}
          <div className="grid grid-cols-1 gap-6 sm:gap-8 mb-16 sm:mb-20 lg:mb-24">
            {[
              {
                step: '1',
                icon: Phone,
                title: 'Free Call',
                description: 'We chat about your business and what you need. Takes 15-30 minutes.',
                points: ['Tell us about your business', 'We listen and understand', 'No pressure or sales talk']
              },
              {
                step: '2',
                icon: Send,
                title: 'Get Your Plan',
                description: 'We send you a clear plan with pricing and timeline in 24-48 hours.',
                points: ['See exactly what you get', 'Know the exact price', 'Understand the timeline']
              },
              {
                step: '3',
                icon: Rocket,
                title: 'We Build It',
                description: 'We create your website and launch it. Then we support you as you grow.',
                points: ['You see progress updates', 'We launch your site', 'We help whenever you need']
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="group relative"
              >
                <div className="relative p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white border-2 border-slate-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:border-[#0066FF]/40">
                  
                  {/* Step Number - Mobile Friendly */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#0066FF]/10 flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl text-[#0066FF]">{item.step}</span>
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-[#0066FF]/10 to-[#3b82f6]/5 flex items-center justify-center mb-5 sm:mb-6">
                    <item.icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#0066FF]" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl text-slate-900 mb-3 sm:mb-4">
                    {item.title}
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed mb-5 sm:mb-6">
                    {item.description}
                  </p>

                  {/* Points - Easy to read on mobile */}
                  <ul className="space-y-3 sm:space-y-4">
                    {item.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-base sm:text-lg text-slate-600">
                        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#0066FF] flex-shrink-0 mt-1" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Why Choose Us - Simplified */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center bg-gradient-to-br from-slate-50 to-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 border-2 border-slate-200 shadow-lg"
          >
            <div className="max-w-[900px] mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/20 mb-6 sm:mb-8">
                <div className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
                <span className="text-sm sm:text-base text-[#0066FF]">Why Techinnov</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-slate-900 mb-5 sm:mb-6">
                We Get Results for
                <br />
                <span className="text-[#0066FF]">Indian Businesses</span>
              </h2>

              <p className="text-lg sm:text-xl md:text-2xl text-slate-600 leading-relaxed mb-8 sm:mb-10">
                We focus on making your business grow. That's it.
              </p>

              {/* Simple Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-6 sm:pt-8 border-t-2 border-slate-200">
                {[
                  {
                    value: 'Mumbai',
                    label: 'India Based',
                    subtext: 'We understand local business'
                  },
                  {
                    value: '100%',
                    label: 'Custom Made',
                    subtext: 'Built just for you'
                  },
                  {
                    value: '24/7',
                    label: 'Always Here',
                    subtext: 'We\'re here for you'
                  }
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4">
                    <div className="text-3xl sm:text-4xl md:text-5xl text-[#0066FF] mb-2 sm:mb-3">{stat.value}</div>
                    <div className="text-lg sm:text-xl text-slate-900 mb-1 sm:mb-2">{stat.label}</div>
                    <div className="text-sm sm:text-base text-slate-500">{stat.subtext}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}