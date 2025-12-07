import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, ChevronDown, Zap } from 'lucide-react'
import { Button } from './ui/button'

interface NavbarProps {
  onNavigate: (page: string) => void
  currentPage: string
}

export function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Detect scroll for glassmorphic effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const mainLinks = ['About', 'Services', 'Portfolio']
  const moreLinks = [
    { name: 'Responsive', label: 'Mobile-Friendly Websites' },
    { name: 'SEO', label: 'Google SEO' },
    { name: 'Speed', label: 'Fast Websites' },
    { name: '8Reasons', label: 'Why You Need a Website' },
    { name: 'CustomSoftware', label: 'Custom Software' },
    { name: 'BigIdea', label: 'Have a Big Idea?' },
  ]

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-200/50 border-b border-slate-200/50' 
            : 'bg-white/80 backdrop-blur-md border-b border-slate-100/50'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left: Logo + Navigation */}
            <div className="flex items-center gap-8 lg:gap-12">
              {/* Logo */}
              <motion.div 
                onClick={() => onNavigate('Home')}
                className="cursor-pointer flex items-center gap-2 group touch-manipulation py-4"
                whileTap={{ scale: 0.98 }}
              >
                {/* Icon */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF] to-[#3b82f6] blur-md opacity-20 rounded-lg" />
                  <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#3b82f6] flex items-center justify-center shadow-lg shadow-[#0066FF]/20">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                
                <h1 className="text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight">
                  TECHINNOV
                </h1>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {mainLinks.map((link) => (
                  <motion.button
                    key={link}
                    onClick={() => onNavigate(link)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 text-sm transition-all duration-300 rounded-lg relative overflow-hidden group ${
                      currentPage === link
                        ? 'text-[#0066FF]'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {/* Hover background effect */}
                    <span className={`absolute inset-0 bg-gradient-to-r from-[#0066FF]/5 to-[#3b82f6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      currentPage === link ? 'opacity-100' : ''
                    }`} />
                    
                    {/* Active indicator */}
                    {currentPage === link && (
                      <motion.span 
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0066FF] to-[#3b82f6]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    <span className="relative z-10">{link}</span>
                  </motion.button>
                ))}
                
                {/* More Dropdown */}
                <div className="relative">
                  <motion.button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-[#0066FF]/5 hover:to-[#3b82f6]/5 transition-all duration-300 rounded-lg flex items-center gap-1 group"
                  >
                    More
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </motion.button>
                  
                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl border border-slate-200/50 rounded-xl shadow-2xl shadow-slate-200/50 overflow-hidden"
                      >
                        <div className="py-2">
                          {moreLinks.map((link, i) => (
                            <motion.button
                              key={link.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              onClick={() => {
                                onNavigate(link.name)
                                setIsDropdownOpen(false)
                              }}
                              className="w-full text-left px-4 py-3 text-sm text-slate-600 hover:text-[#0066FF] hover:bg-gradient-to-r hover:from-[#0066FF]/5 hover:to-[#3b82f6]/5 transition-all duration-300 group"
                            >
                              <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#0066FF] transition-colors" />
                                {link.label}
                              </span>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                onClick={() => onNavigate('Contact')}
                variant="ghost"
                size="sm"
                className="text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-[#0066FF]/5 hover:to-[#3b82f6]/5 h-10 px-5 rounded-lg transition-all duration-300"
              >
                Contact
              </Button>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => onNavigate('RequestProject')}
                  size="sm"
                  className="bg-gradient-to-r from-[#0066FF] to-[#3b82f6] hover:shadow-xl hover:shadow-[#0066FF]/30 text-white h-10 px-6 rounded-lg transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Start Building</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] to-[#0066FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden text-slate-900 p-3 -mr-3 touch-manipulation hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200/50"
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.2 }}
                className="px-5 py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto"
              >
                {mainLinks.map((link) => (
                  <button
                    key={link}
                    onClick={() => {
                      onNavigate(link)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`block w-full text-left px-4 py-3 rounded-lg text-base transition-all duration-200 touch-manipulation ${
                      currentPage === link
                        ? 'text-[#0066FF] bg-gradient-to-r from-[#0066FF]/10 to-[#3b82f6]/10'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {link}
                  </button>
                ))}
                
                {/* More Section in Mobile */}
                <div className="pt-2 pb-2 border-t border-slate-200 mt-2">
                  <div className="px-4 py-2 text-xs uppercase text-slate-500 tracking-wider">More</div>
                  {moreLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => {
                        onNavigate(link.name)
                        setIsMobileMenuOpen(false)
                      }}
                      className="block w-full text-left px-4 py-3 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all duration-200 touch-manipulation"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>

                {/* Mobile Action Buttons */}
                <div className="flex flex-col gap-2 pt-4 border-t border-slate-200">
                  <Button
                    onClick={() => {
                      onNavigate('Contact')
                      setIsMobileMenuOpen(false)
                    }}
                    variant="outline"
                    className="w-full h-12 text-base border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg"
                  >
                    Contact
                  </Button>
                  <Button
                    onClick={() => {
                      onNavigate('RequestProject')
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full h-12 text-base bg-gradient-to-r from-[#0066FF] to-[#3b82f6] hover:shadow-xl hover:shadow-[#0066FF]/30 text-white rounded-lg transition-all duration-300"
                  >
                    Start Building
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}