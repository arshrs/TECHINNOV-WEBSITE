import { motion } from 'motion/react'
import { Zap, Clock, ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/button'

interface SpeedPageProps {
  onNavigate: (page: string) => void
}

export function SpeedPage({ onNavigate }: SpeedPageProps) {
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
            transition={{ delay: 0.1, duration: 0.4, type: "spring", stiffness: 200 }}
            className="inline-block mb-12 sm:mb-[55px]"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF] to-[#3b82f6] blur-3xl opacity-20" />
              <div className="relative w-28 h-28 sm:w-[144px] sm:h-[144px] rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#3b82f6] p-6 sm:p-8 shadow-xl shadow-[#0066FF]/20">
                <Zap className="w-full h-full text-white" strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>

          {/* Shocking Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl text-slate-900 mb-6 sm:mb-[34px] tracking-tight px-4">
            Every Second Costs You
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#3b82f6]">
              7% in Sales
            </span>
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl text-slate-700 mb-12 sm:mb-[55px] max-w-3xl mx-auto px-4">
            Slow = Broke. Fast = Rich.
          </p>

          {/* Visual Speed Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto mb-20 sm:mb-[89px]">
            {/* Slow Site */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 sm:p-8 rounded-2xl border-2 border-red-500/30 bg-red-500/5 backdrop-blur-sm"
            >
              <Clock className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mx-auto mb-3 sm:mb-4" strokeWidth={1.5} />
              <div className="text-4xl sm:text-5xl text-red-500 mb-2 sm:mb-3">5s</div>
              <div className="text-slate-900 mb-2">Slow Site</div>
              <div className="text-sm text-slate-600 mb-3 sm:mb-4">Industry Average</div>
              <div className="space-y-2 text-sm text-slate-500">
                <div>❌ 53% bounce rate</div>
                <div>❌ Low conversions</div>
                <div>❌ Poor rankings</div>
              </div>
            </motion.div>

            {/* Fast Site */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 sm:p-8 rounded-2xl border-2 border-[#0066FF]/30 bg-gradient-to-br from-[#0066FF]/5 to-[#3b82f6]/5 backdrop-blur-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-gradient-to-br from-[#0066FF] to-[#3b82f6] text-white text-xs px-3 py-1 rounded-bl-lg">
                RECOMMENDED
              </div>
              <Zap className="w-12 h-12 sm:w-16 sm:h-16 text-[#0066FF] mx-auto mb-3 sm:mb-4" strokeWidth={1.5} />
              <div className="text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#3b82f6] mb-2 sm:mb-3">
                {'<'}1s
              </div>
              <div className="text-slate-900 mb-2">Lightning Fast</div>
              <div className="text-sm text-slate-600 mb-3 sm:mb-4">Our Standard</div>
              <div className="space-y-2 text-sm text-[#0066FF]">
                <div>✓ 2× conversions</div>
                <div>✓ Top SEO rankings</div>
                <div>✓ Happy users</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20 sm:mb-[89px]"
        >
          {[
            { 
              impact: '-35%',
              label: 'Revenue Loss',
              desc: 'For every 1s delay in load time'
            },
            { 
              impact: '100',
              label: 'Performance Score',
              desc: 'We guarantee 90+ on all metrics'
            },
            { 
              impact: '+200%',
              label: 'Faster',
              desc: 'Than average competitor sites'
            }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="text-center p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-lg hover:border-[#0066FF]/30 hover:shadow-xl hover:shadow-[#0066FF]/10 transition-all duration-300 group"
            >
              <div className="text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#3b82f6] mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                {stat.impact}
              </div>
              <h3 className="text-xl sm:text-2xl text-slate-900 mb-2 sm:mb-3">{stat.label}</h3>
              <p className="text-slate-600 text-sm">{stat.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* What We Do - Ultra Simple */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="p-6 sm:p-[34px] rounded-2xl border border-slate-200 bg-white shadow-lg mb-20 sm:mb-[89px]"
        >
          <h2 className="text-2xl sm:text-3xl text-slate-900 mb-6 sm:mb-[34px] text-center">
            We Make Your Site <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#3b82f6]">Lightning Fast</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: '🚀', text: 'Image Optimization' },
              { icon: '⚡', text: 'Code Minification' },
              { icon: '🌐', text: 'CDN Setup' },
              { icon: '📊', text: 'Performance Monitoring' }
            ].map((item, i) => (
              <div key={i} className="text-center p-4 sm:p-6 rounded-xl border border-slate-200 bg-slate-50 hover:border-[#0066FF]/30 hover:shadow-lg hover:shadow-[#0066FF]/10 transition-all">
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{item.icon}</div>
                <div className="text-slate-700 text-xs sm:text-sm">{item.text}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Massive CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
          className="text-center"
        >
          <div className="inline-block p-8 sm:p-12 lg:p-[55px] rounded-3xl bg-gradient-to-br from-[#0066FF]/5 to-[#3b82f6]/5 border border-[#0066FF]/20 backdrop-blur-sm mb-6 sm:mb-[34px] max-w-full">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-slate-900 mb-4 sm:mb-[21px] px-4">
              Stop Losing Money to Slow Load Times
            </h2>
            <p className="text-slate-600 mb-6 sm:mb-[34px] text-base sm:text-lg max-w-xl mx-auto px-4">
              Get a blazing-fast website that converts visitors into customers
            </p>
            <Button
              onClick={() => onNavigate('RequestProject')}
              className="bg-gradient-to-r from-[#0066FF] to-[#3b82f6] text-white hover:shadow-2xl hover:shadow-[#0066FF]/30 transition-all duration-300 text-base sm:text-xl px-8 sm:px-12 lg:px-[55px] py-6 sm:py-8 lg:py-[34px] h-auto rounded-xl group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2 sm:gap-3 uppercase tracking-wider">
                <span className="break-words">Speed Up My Site</span>
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform flex-shrink-0" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] to-[#0066FF] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </div>

          <p className="text-slate-500 text-xs sm:text-sm px-4">
            <span className="text-[#0066FF]">✓</span> Free speed audit • Guaranteed results or money back
          </p>
        </motion.div>
      </div>
    </div>
  )
}