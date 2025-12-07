import { motion } from 'motion/react'
import { Code, Zap, TrendingUp, Shield, ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/button'

interface CustomSoftwarePageProps {
  onNavigate: (page: string) => void
}

export function CustomSoftwarePage({ onNavigate }: CustomSoftwarePageProps) {
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
              <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF] to-[#3b82f6] blur-3xl opacity-20 animate-pulse" />
              <div className="relative w-28 h-28 sm:w-[144px] sm:h-[144px] rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#3b82f6] p-6 sm:p-8 shadow-xl shadow-[#0066FF]/20">
                <Code className="w-full h-full text-white" strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>

          {/* Power Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl text-slate-900 mb-6 sm:mb-[34px] tracking-tight px-4 max-w-5xl mx-auto break-words">
            Generic Software
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#3b82f6]">
              = Generic Results
            </span>
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl text-slate-700 mb-4 sm:mb-[21px] max-w-3xl mx-auto px-4 break-words">
            Custom Software = Unfair Advantage
          </p>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-20 sm:mb-[89px] px-4 break-words">
            Built exactly for your business. No compromises. No limitations.
          </p>
        </motion.div>

        {/* Problem vs Solution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-[89px] px-4"
        >
          {/* Generic Software - Problem */}
          <div className="p-6 sm:p-8 rounded-2xl border-2 border-red-500/30 bg-red-500/5 backdrop-blur-sm">
            <div className="text-center mb-4 sm:mb-6">
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">❌</div>
              <h3 className="text-xl sm:text-2xl text-slate-900 mb-3 sm:mb-4">Off-The-Shelf Software</h3>
            </div>
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-600">
              <div className="flex items-start gap-2">
                <span className="text-red-500 flex-shrink-0">•</span>
                <span>Designed for everyone = perfect for no one</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500 flex-shrink-0">•</span>
                <span>Forced to change your workflow to fit the software</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500 flex-shrink-0">•</span>
                <span>Paying for features you'll never use</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500 flex-shrink-0">•</span>
                <span>Same tools as your competitors</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500 flex-shrink-0">•</span>
                <span>Limited scalability and customization</span>
              </div>
            </div>
          </div>

          {/* Custom Software - Solution */}
          <div className="p-6 sm:p-8 rounded-2xl border-2 border-[#0066FF]/30 bg-gradient-to-br from-[#0066FF]/5 to-[#3b82f6]/5 backdrop-blur-sm relative">
            <div className="absolute top-0 right-0 bg-gradient-to-br from-[#0066FF] to-[#3b82f6] text-white text-xs px-3 sm:px-4 py-1 sm:py-1.5 rounded-bl-xl">
              RECOMMENDED
            </div>
            <div className="text-center mb-4 sm:mb-6">
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">✓</div>
              <h3 className="text-xl sm:text-2xl text-slate-900 mb-3 sm:mb-4">Custom Software</h3>
            </div>
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-700">
              <div className="flex items-start gap-2">
                <span className="text-[#0066FF] flex-shrink-0">•</span>
                <span>Built exactly for YOUR business process</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#0066FF] flex-shrink-0">•</span>
                <span>Software adapts to you, not the other way</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#0066FF] flex-shrink-0">•</span>
                <span>Only the features you need</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#0066FF] flex-shrink-0">•</span>
                <span>Competitive advantage competitors can't copy</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#0066FF] flex-shrink-0">•</span>
                <span>Scales infinitely with your growth</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ROI Proof - Visual Impact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 sm:p-[34px] rounded-2xl border border-slate-200 bg-white shadow-lg mb-20 sm:mb-[89px] mx-4"
        >
          <h2 className="text-2xl sm:text-3xl text-slate-900 mb-6 sm:mb-[34px] text-center px-2 break-words">
            Real Results from Custom Software
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {[
              { icon: '⚡', metric: '60%', label: 'Faster Operations' },
              { icon: '💰', metric: '40%', label: 'Cost Reduction' },
              { icon: '📈', metric: '3×', label: 'Revenue Growth' },
              { icon: '🎯', metric: '100%', label: 'Perfect Fit' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="text-center p-3 sm:p-6 rounded-xl border border-slate-200 bg-slate-50 hover:border-[#0066FF]/30 hover:shadow-lg hover:shadow-[#0066FF]/10 transition-all group"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl mb-2 sm:mb-3 lg:mb-4">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#3b82f6] mb-1 sm:mb-2 group-hover:scale-110 transition-transform break-words">
                  {stat.metric}
                </div>
                <div className="text-slate-600 text-xs sm:text-sm break-words px-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* What You Get */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20 sm:mb-[89px] px-4"
        >
          {[
            { icon: Zap, title: 'Automate Everything', desc: 'Tasks that take hours → seconds' },
            { icon: TrendingUp, title: 'Scale Without Limits', desc: 'Grows with your business' },
            { icon: Shield, title: 'Own Your Data', desc: 'Full control, zero dependencies' }
          ].map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="text-center p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-lg hover:border-[#0066FF]/30 hover:shadow-xl hover:shadow-[#0066FF]/10 transition-all group"
            >
              <benefit.icon className="w-12 h-12 sm:w-16 sm:h-16 text-[#0066FF] mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              <h3 className="text-xl sm:text-2xl text-slate-900 mb-2 sm:mb-3 break-words px-2">{benefit.title}</h3>
              <p className="text-slate-600 text-sm sm:text-base break-words px-2">{benefit.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Massive CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, type: "spring", stiffness: 200 }}
          className="text-center px-4"
        >
          <div className="inline-block w-full max-w-4xl p-6 sm:p-8 lg:p-[55px] rounded-3xl bg-gradient-to-br from-[#0066FF]/5 to-[#3b82f6]/5 border border-[#0066FF]/20 backdrop-blur-sm mb-6 sm:mb-[34px]">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-slate-900 mb-4 sm:mb-[21px] px-4 break-words">
              Stop Fighting With Generic Software
            </h2>
            <p className="text-slate-600 mb-6 sm:mb-[34px] text-base sm:text-lg max-w-xl mx-auto px-4 break-words">
              Get software that works exactly how you need it to
            </p>
            <div className="flex justify-center px-2">
              <Button
                onClick={() => onNavigate('RequestProject')}
                className="w-full sm:w-auto bg-gradient-to-r from-[#0066FF] to-[#3b82f6] text-white hover:shadow-2xl hover:shadow-[#0066FF]/30 transition-all duration-300 text-sm sm:text-lg lg:text-xl px-6 sm:px-10 lg:px-[55px] py-4 sm:py-6 lg:py-[34px] h-auto rounded-xl group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 uppercase tracking-wider break-words text-center">
                  Build My Custom Solution
                  <Code className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform flex-shrink-0" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] to-[#0066FF] opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </div>
          </div>

          <p className="text-slate-500 text-xs sm:text-sm px-4 break-words">
            <span className="text-[#0066FF]">✓</span> Free consultation • Transparent pricing • Own the source code
          </p>
        </motion.div>
      </div>
    </div>
  )
}