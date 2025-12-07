import { motion } from 'motion/react'
import { Lightbulb, Rocket, ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/button'

interface BigIdeaPageProps {
  onNavigate: (page: string) => void
}

export function BigIdeaPage({ onNavigate }: BigIdeaPageProps) {
  const unicorns = [
    { name: 'Uber', started: 'Ride hailing idea', now: '$90B' },
    { name: 'Swiggy', started: 'Food delivery app', now: '$10B' },
    { name: 'Airbnb', started: 'Rent a room', now: '$100B' },
    { name: 'Zomato', started: 'Menu listing', now: '$8B' }
  ]

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-6xl w-full">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="mb-8"
        >
          <Button
            onClick={() => onNavigate('Home')}
            variant="ghost"
            className="group flex items-center gap-2 text-slate-600 hover:text-[#0066FF] hover:bg-[#0066FF]/5 transition-all duration-300 -ml-2"
          >
            <motion.div
              whileHover={{ x: -4 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.div>
            <span>Back to Home</span>
          </Button>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-20 sm:mb-[89px]"
        >
          {/* Animated Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-12 sm:mb-[55px]"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF] to-[#3b82f6] blur-3xl opacity-20 animate-pulse" />
              <div className="relative w-28 h-28 sm:w-[144px] sm:h-[144px] rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#3b82f6] p-6 sm:p-8 shadow-xl shadow-[#0066FF]/20">
                <Lightbulb className="w-full h-full text-white" strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>

          {/* Power Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl text-slate-900 mb-6 sm:mb-[34px] tracking-tight px-4">
            Your Idea Could Be
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#3b82f6]">
              The Next Billion-Dollar App
            </span>
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl text-slate-700 mb-20 sm:mb-[89px] max-w-3xl mx-auto px-4">
            Every unicorn started with a simple idea. Yours is next.
          </p>
        </motion.div>

        {/* Unicorn Examples - Minimalist Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-20 sm:mb-[89px] px-4"
        >
          {unicorns.map((company, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="p-4 sm:p-6 rounded-2xl border border-slate-200 bg-white shadow-lg hover:border-[#0066FF]/30 hover:shadow-xl hover:shadow-[#0066FF]/10 transition-all group text-center"
            >
              <div className="text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#3b82f6] mb-2 sm:mb-3 group-hover:scale-110 transition-transform break-words">
                {company.now}
              </div>
              <h3 className="text-lg sm:text-xl text-slate-900 mb-1 sm:mb-2 break-words">{company.name}</h3>
              <p className="text-xs text-slate-500 break-words">{company.started}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* The Journey - Simple 3 Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-20 sm:mb-[89px] px-4"
        >
          <h2 className="text-3xl sm:text-4xl text-slate-900 mb-12 sm:mb-[55px] text-center px-4">
            From <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#3b82f6]">Idea</span> to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#3b82f6]">Reality</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { 
                step: '1',
                title: 'Validate',
                desc: 'Is it viable?',
                detail: 'Market research + competitor analysis'
              },
              { 
                step: '2',
                title: 'Build MVP',
                desc: 'Launch in weeks',
                detail: 'Core features + real user feedback'
              },
              { 
                step: '3',
                title: 'Scale to Millions',
                desc: 'Grow exponentially',
                detail: 'Infrastructure + optimization + marketing'
              }
            ].map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                className="relative group"
              >
                <div className="text-center p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-lg hover:border-[#0066FF]/30 hover:shadow-xl hover:shadow-[#0066FF]/10 transition-all h-full">
                  {/* Step Number */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-[#0066FF] to-[#3b82f6] flex items-center justify-center text-white text-xl sm:text-2xl mx-auto mb-4 sm:mb-6 shadow-lg shadow-[#0066FF]/30 group-hover:scale-110 transition-transform">
                    {phase.step}
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl text-slate-900 mb-2 sm:mb-3 break-words">{phase.title}</h3>
                  <p className="text-base sm:text-lg text-[#0066FF] mb-3 sm:mb-4 break-words">{phase.desc}</p>
                  <p className="text-sm text-slate-600 break-words">{phase.detail}</p>
                </div>
                
                {/* Arrow connector */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 text-[#0066FF] text-2xl sm:text-3xl z-10">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Market Opportunity */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="p-6 sm:p-[34px] rounded-2xl bg-gradient-to-br from-[#0066FF]/5 to-transparent border border-[#0066FF]/20 backdrop-blur-sm mb-20 sm:mb-[89px] mx-4"
        >
          <h2 className="text-2xl sm:text-3xl text-slate-900 mb-6 sm:mb-[34px] text-center px-4 break-words">
            The Opportunity is <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#3b82f6]">Massive</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { stat: '6.6B', label: 'Smartphone Users Worldwide' },
              { stat: '$400B+', label: 'Annual App Economy' },
              { stat: '4.8hrs', label: 'Daily App Usage Per Person' }
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 sm:p-6 rounded-xl border border-slate-200 bg-slate-50 shadow-md">
                <div className="text-3xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#3b82f6] mb-2 sm:mb-3 whitespace-nowrap">
                  {stat.stat}
                </div>
                <p className="text-slate-600 text-xs sm:text-sm break-words">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Why Build With Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20 sm:mb-[89px] px-4"
        >
          {[
            { icon: '⚡', title: 'Fast', desc: 'MVP in weeks, not months' },
            { icon: '📈', title: 'Scalable', desc: 'Built for millions of users' },
            { icon: '🎯', title: 'Expert', desc: 'Technical + business guidance' }
          ].map((why, i) => (
            <div
              key={i}
              className="text-center p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-lg hover:border-[#0066FF]/30 hover:shadow-xl hover:shadow-[#0066FF]/10 transition-all"
            >
              <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">{why.icon}</div>
              <h3 className="text-xl sm:text-2xl text-slate-900 mb-2 sm:mb-3">{why.title}</h3>
              <p className="text-slate-600 text-sm sm:text-base">{why.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Massive CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
          className="text-center px-4"
        >
          <div className="inline-block w-full max-w-4xl p-6 sm:p-8 lg:p-[55px] rounded-3xl bg-gradient-to-br from-[#0066FF]/5 to-[#3b82f6]/5 border border-[#0066FF]/20 backdrop-blur-sm mb-6 sm:mb-[34px]">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-slate-900 mb-4 sm:mb-[21px] px-4 break-words">
              Stop Dreaming. Start Building.
            </h2>
            <p className="text-slate-600 mb-6 sm:mb-[34px] text-base sm:text-lg max-w-xl mx-auto px-4 break-words">
              Your billion-dollar app starts with one conversation
            </p>
            <div className="flex justify-center px-2">
              <Button
                onClick={() => onNavigate('RequestProject')}
                className="w-full sm:w-auto bg-gradient-to-r from-[#0066FF] to-[#3b82f6] text-white hover:shadow-2xl hover:shadow-[#0066FF]/30 transition-all duration-300 text-sm sm:text-lg lg:text-xl px-6 sm:px-10 lg:px-[55px] py-4 sm:py-6 lg:py-[34px] h-auto rounded-xl group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 uppercase tracking-wider break-words text-center">
                  Build My App Now
                  <Rocket className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-rotate-45 transition-transform flex-shrink-0" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] to-[#0066FF] opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </div>
          </div>

          <p className="text-slate-500 text-xs sm:text-sm px-4">
            <span className="text-[#0066FF]">✓</span> Free idea validation • Transparent pricing • Launch in weeks
          </p>
        </motion.div>
      </div>
    </div>
  )
}