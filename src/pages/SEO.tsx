import { motion } from 'motion/react'
import { Search, TrendingUp, ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/button'

interface SEOPageProps {
  onNavigate: (page: string) => void
}

export function SEOPage({ onNavigate }: SEOPageProps) {
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

        {/* Hero Section - Golden ratio emphasis */}
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
                <Search className="w-full h-full text-white" strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>

          {/* Power Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl text-slate-900 mb-6 sm:mb-[34px] tracking-tight px-4 max-w-5xl mx-auto break-words">
            Page 1 of Google
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#3b82f6]">
              Or You Don't Exist
            </span>
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl text-slate-700 mb-4 sm:mb-[21px] max-w-3xl mx-auto px-4 break-words">
            Get Found. Get Clicks. Get Customers.
          </p>

          {/* Shocking stat */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-block p-6 sm:p-[34px] rounded-2xl bg-gradient-to-br from-[#0066FF]/5 to-transparent border border-[#0066FF]/20 mb-20 sm:mb-[89px]"
          >
            <div className="text-5xl sm:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#3b82f6] mb-3 sm:mb-4">
              75%
            </div>
            <p className="text-slate-600 text-base sm:text-lg">
              of users never scroll past the first page
            </p>
          </motion.div>
        </motion.div>

        {/* Visual Journey - 3 steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20 sm:mb-[89px]"
        >
          {[
            { 
              icon: Search, 
              title: 'Optimize', 
              result: 'Rank Higher',
              desc: 'Technical SEO + perfect content structure'
            },
            { 
              icon: TrendingUp, 
              title: 'Dominate', 
              result: '10× Traffic',
              desc: 'Page 1 rankings for your key terms'
            },
            { 
              icon: '💰', 
              title: 'Convert', 
              result: 'More Sales',
              desc: 'Turn organic traffic into revenue'
            }
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="relative group"
            >
              <div className="text-center p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-lg hover:border-[#0066FF]/30 hover:shadow-xl hover:shadow-[#0066FF]/10 transition-all duration-300 h-full">
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#0066FF] to-[#3b82f6] flex items-center justify-center text-white text-lg sm:text-xl shadow-lg shadow-[#0066FF]/30">
                  {i + 1}
                </div>
                
                {/* Icon or emoji */}
                <div className="mb-4 sm:mb-6 mt-4">
                  {typeof step.icon === 'string' ? (
                    <div className="text-5xl sm:text-6xl">{step.icon}</div>
                  ) : (
                    <step.icon className="w-12 h-12 sm:w-16 sm:h-16 text-[#0066FF] mx-auto" strokeWidth={1.5} />
                  )}
                </div>
                
                <h3 className="text-xl sm:text-2xl text-slate-900 mb-2 sm:mb-3">{step.title}</h3>
                <div className="text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#3b82f6] mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  {step.result}
                </div>
                <p className="text-slate-600 text-sm">{step.desc}</p>
              </div>
              
              {/* Arrow connector */}
              {i < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-4 text-[#0066FF] text-2xl sm:text-3xl">
                  →
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Results Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-20 sm:mb-[89px]"
        >
          {[
            { metric: '3-6', unit: 'Months', label: 'To Page 1' },
            { metric: '10×', unit: 'More', label: 'Organic Traffic' },
            { metric: '0', unit: 'Ad Spend', label: 'Free Forever' },
            { metric: '24/7', unit: 'Working', label: 'Never Stops' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="text-center p-4 sm:p-6 rounded-xl border border-slate-200 bg-white shadow-lg hover:border-[#0066FF]/30 hover:shadow-xl hover:shadow-[#0066FF]/10 transition-all"
            >
              <div className="text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#3b82f6] mb-1">
                {stat.metric}
              </div>
              <div className="text-xs sm:text-sm text-slate-600 mb-1">{stat.unit}</div>
              <div className="text-xs text-slate-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Massive CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, type: "spring", stiffness: 200 }}
          className="text-center"
        >
          <div className="inline-block p-8 sm:p-12 lg:p-[55px] rounded-3xl bg-gradient-to-br from-[#0066FF]/5 to-[#3b82f6]/5 border border-[#0066FF]/20 backdrop-blur-sm mb-6 sm:mb-[34px] max-w-full">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-slate-900 mb-4 sm:mb-[21px] px-4">
              Your Competitors Are Already Ranking
            </h2>
            <p className="text-slate-600 mb-6 sm:mb-[34px] text-base sm:text-lg max-w-xl mx-auto px-4">
              Every day without SEO is another day of lost customers
            </p>
            <Button
              onClick={() => onNavigate('RequestProject')}
              className="bg-gradient-to-r from-[#0066FF] to-[#3b82f6] text-white hover:shadow-2xl hover:shadow-[#0066FF]/30 transition-all duration-300 text-base sm:text-xl px-8 sm:px-12 lg:px-[55px] py-6 sm:py-8 lg:py-[34px] h-auto rounded-xl group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2 sm:gap-3 uppercase tracking-wider">
                <span className="break-words">Dominate Google Now</span>
                <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] to-[#0066FF] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </div>

          <p className="text-slate-500 text-xs sm:text-sm px-4">
            <span className="text-[#0066FF]">✓</span> Free SEO audit included • No long-term contracts
          </p>
        </motion.div>
      </div>
    </div>
  )
}