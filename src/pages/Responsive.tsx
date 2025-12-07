import { motion } from 'motion/react'
import { Smartphone, ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/button'

interface ResponsivePageProps {
  onNavigate: (page: string) => void
}

export function ResponsivePage({ onNavigate }: ResponsivePageProps) {
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

        {/* Hero Section - 61.8% of visual weight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-20 sm:mb-[89px]"
        >
          {/* Icon with golden ratio sizing */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4, type: "spring", stiffness: 200 }}
            className="inline-block mb-12 sm:mb-[55px]"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF] to-[#3b82f6] blur-3xl opacity-20" />
              <div className="relative w-28 h-28 sm:w-[144px] sm:h-[144px] rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#3b82f6] p-6 sm:p-8 shadow-xl shadow-[#0066FF]/20">
                <Smartphone className="w-full h-full text-white" strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>

          {/* Headline with Phi-based sizing */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl text-slate-900 mb-6 sm:mb-[34px] tracking-tight px-4 max-w-5xl mx-auto break-words">
            60% of Your Visitors
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#3b82f6]">
              Are on Mobile
            </span>
          </h1>

          {/* Subheading - minimal, impactful */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-slate-700 mb-4 sm:mb-[21px] max-w-3xl mx-auto px-4 break-words">
            Is Your Website Ready?
          </p>
          
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-12 sm:mb-[55px] px-4 break-words">
            Every device. Every screen. One perfect experience.
          </p>

          {/* Visual proof - 3 device previews */}
          <div className="flex justify-center gap-4 sm:gap-[21px] mb-20 sm:mb-[89px] px-4 flex-wrap">
            {[
              { width: 'w-12 sm:w-16', height: 'h-20 sm:h-24', label: 'Mobile', delay: 0.15 },
              { width: 'w-16 sm:w-20', height: 'h-24 sm:h-28', label: 'Tablet', delay: 0.2 },
              { width: 'w-24 sm:w-32', height: 'h-20 sm:h-24', label: 'Desktop', delay: 0.25 }
            ].map((device, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: device.delay, duration: 0.3 }}
                className="flex flex-col items-center gap-2 sm:gap-3"
              >
                <div className={`${device.width} ${device.height} rounded-lg border-2 border-[#0066FF]/30 bg-gradient-to-br from-[#0066FF]/5 to-transparent backdrop-blur-sm flex items-center justify-center group hover:border-[#0066FF] hover:shadow-lg hover:shadow-[#0066FF]/20 transition-all duration-300`}>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#0066FF] to-[#3b82f6] opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-slate-500 text-xs sm:text-sm">{device.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key Benefits - 38.2% of visual weight - Minimal text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20 sm:mb-[89px] px-4"
        >
          {[
            { stat: '2.5×', label: 'Higher Conversions', desc: 'Mobile users convert more when sites work flawlessly' },
            { stat: '#1', label: 'SEO Ranking Factor', desc: 'Google prioritizes mobile-friendly websites' },
            { stat: '100%', label: 'Future-Proof', desc: 'Adapts to devices that don\'t exist yet' }
          ].map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="text-center p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-lg hover:border-[#0066FF]/30 hover:shadow-xl hover:shadow-[#0066FF]/10 transition-all duration-300 group"
            >
              <div className="text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#3b82f6] mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                {benefit.stat}
              </div>
              <h3 className="text-lg sm:text-xl text-slate-900 mb-2 sm:mb-3">{benefit.label}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Massive CTA - Golden ratio emphasis */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
          className="text-center px-4"
        >
          <div className="inline-block w-full max-w-4xl p-6 sm:p-8 lg:p-[55px] rounded-3xl bg-gradient-to-br from-[#0066FF]/5 to-[#3b82f6]/5 border border-[#0066FF]/20 backdrop-blur-sm mb-6 sm:mb-[34px]">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-slate-900 mb-4 sm:mb-[21px] break-words px-2">
              Don't Lose 60% of Your Traffic
            </h2>
            <p className="text-slate-600 mb-6 sm:mb-[34px] text-base sm:text-lg max-w-xl mx-auto break-words px-2">
              Get a responsive website that works perfectly on every device
            </p>
            <div className="flex justify-center px-2">
              <Button
                onClick={() => onNavigate('RequestProject')}
                className="w-full sm:w-auto bg-gradient-to-r from-[#0066FF] to-[#3b82f6] text-white hover:shadow-2xl hover:shadow-[#0066FF]/30 transition-all duration-300 text-sm sm:text-lg lg:text-xl px-6 sm:px-10 lg:px-[55px] py-4 sm:py-6 lg:py-[34px] h-auto rounded-xl group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 uppercase tracking-wider break-words text-center">
                  Make My Site Responsive
                </span>
              </Button>
            </div>
          </div>

          <p className="text-slate-500 text-xs sm:text-sm">
            <span className="text-[#0066FF]">✓</span> No commitment required • Free consultation
          </p>
        </motion.div>
      </div>
    </div>
  )
}