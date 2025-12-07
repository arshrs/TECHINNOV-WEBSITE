import { motion } from 'motion/react'
import { Shield, DollarSign, Clock, TrendingUp, Zap, Globe, BarChart, Sparkles, ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/button'

interface EightReasonsPageProps {
  onNavigate: (page: string) => void
}

export function EightReasonsPage({ onNavigate }: EightReasonsPageProps) {
  const reasons = [
    { icon: Shield, title: 'Build Trust', impact: '75% judge by website' },
    { icon: DollarSign, title: '24/7 Sales Machine', impact: 'Never stop selling' },
    { icon: Clock, title: 'Always Open', impact: 'Work while you sleep' },
    { icon: TrendingUp, title: 'Beat Competitors', impact: 'Dominate your market' },
    { icon: Zap, title: 'Automate Everything', impact: 'Save hours daily' },
    { icon: Globe, title: 'Go Global', impact: 'Reach millions' },
    { icon: BarChart, title: 'Know Your Customers', impact: 'Data-driven growth' },
    { icon: Sparkles, title: 'Future-Proof', impact: 'Stay ahead forever' }
  ]

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-7xl mx-auto">
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
          <h1 className="text-3xl sm:text-5xl lg:text-6xl text-slate-900 mb-6 sm:mb-[34px] tracking-tight">
            No Website in 2025?
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#3b82f6]">
              You're Invisible
            </span>
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl text-slate-700 mb-12 sm:mb-[55px] max-w-3xl mx-auto">
            8 Reasons Your Business Needs a Website Today
          </p>

          {/* Shocking Stat */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block p-6 sm:p-[34px] rounded-2xl bg-gradient-to-br from-[#0066FF]/5 to-transparent border border-[#0066FF]/20 mb-20 sm:mb-[89px]"
          >
            <div className="text-5xl sm:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#3b82f6] mb-3 sm:mb-4">
              81%
            </div>
            <p className="text-slate-600 text-base sm:text-lg max-w-md">
              of customers research online before buying
            </p>
          </motion.div>
        </motion.div>

        {/* 8 Reasons Grid - Minimal, Visual */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20 sm:mb-[89px]">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="group relative"
            >
              <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-lg hover:border-[#0066FF]/30 hover:shadow-xl hover:shadow-[#0066FF]/10 transition-all duration-300 h-full flex flex-col items-center text-center">
                {/* Number Badge */}
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-r from-[#0066FF] to-[#3b82f6] flex items-center justify-center text-white text-sm shadow-lg shadow-[#0066FF]/30">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#3b82f6] p-3 mb-4 sm:mb-6 shadow-lg shadow-[#0066FF]/20 group-hover:shadow-[#0066FF]/40 group-hover:scale-110 transition-all">
                  <reason.icon className="w-full h-full text-white" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl text-slate-900 mb-2 sm:mb-3 group-hover:text-[#0066FF] transition-colors">
                  {reason.title}
                </h3>

                {/* Impact */}
                <p className="text-sm text-slate-600">
                  {reason.impact}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Proof Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20 sm:mb-[89px]"
        >
          {[
            { stat: '75%', label: 'judge credibility by website design' },
            { stat: '88%', label: 'won\'t return after bad experience' },
            { stat: '3× More', label: 'likely to trust businesses with websites' }
          ].map((item, i) => (
            <div
              key={i}
              className="text-center p-6 sm:p-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-[#0066FF]/5 to-transparent backdrop-blur-sm shadow-lg"
            >
              <div className="text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#3b82f6] mb-3 sm:mb-4">
                {item.stat}
              </div>
              <p className="text-slate-600 text-sm sm:text-base">{item.label}</p>
            </div>
          ))}
        </motion.div>

        {/* The Bottom Line */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center p-8 sm:p-12 lg:p-[55px] rounded-3xl bg-gradient-to-br from-[#0066FF]/5 to-[#3b82f6]/5 border border-[#0066FF]/20 backdrop-blur-sm mb-12 sm:mb-[55px]"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-slate-900 mb-4 sm:mb-[21px]">
            The Bottom Line
          </h2>
          <p className="text-lg sm:text-xl text-slate-700 max-w-3xl mx-auto mb-6 sm:mb-[34px]">
            Without a website, you're losing customers to competitors every single day. 
            Your next customer is searching right now—will they find you or someone else?
          </p>
        </motion.div>

        {/* Massive CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
          className="text-center"
        >
          <Button
            onClick={() => onNavigate('RequestProject')}
            className="bg-gradient-to-r from-[#0066FF] to-[#3b82f6] text-white hover:shadow-2xl hover:shadow-[#0066FF]/30 transition-all duration-300 text-lg sm:text-2xl px-12 sm:px-16 lg:px-[89px] py-8 sm:py-12 lg:py-[55px] h-auto rounded-2xl group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3 sm:gap-4 uppercase tracking-wider">
              <span className="break-words">Get My Website Now</span>
              <svg className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-2 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] to-[#0066FF] opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>

          <p className="text-slate-500 text-xs sm:text-sm mt-6 sm:mt-8">
            <span className="text-[#0066FF]">✓</span> Free consultation • Start in 24 hours • No upfront payment
          </p>
        </motion.div>
      </div>
    </div>
  )
}