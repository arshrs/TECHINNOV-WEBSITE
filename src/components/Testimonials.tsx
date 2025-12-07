import React from 'react'
import { motion } from 'motion/react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { Star } from 'lucide-react'

// Testimonials data
const testimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechStart Inc',
    content: 'Techinnov transformed our digital presence completely. The custom software they built increased our efficiency by 60%.',
    rating: 5,
    avatar: ''
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Founder',
    company: 'GrowthLabs',
    content: 'Outstanding work! Their AI automation solutions saved us countless hours and significantly improved our customer service.',
    rating: 5,
    avatar: ''
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'CTO',
    company: 'InnovateCo',
    content: 'Professional, innovative, and reliable. Techinnov delivered our mobile app ahead of schedule with exceptional quality.',
    rating: 5,
    avatar: ''
  },
]

export function Testimonials() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl text-white mb-4"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Trusted by innovative companies worldwide
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative p-8 rounded-xl border border-[#00C8FF]/30 bg-black/60 backdrop-blur-md overflow-hidden group hover:border-[#00C8FF]/50 transition-all duration-300"
            >
              {/* Glassmorphic Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00C8FF]/5 to-transparent" />
              
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-[#00C8FF]/20 to-[#0080FF]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              <div className="relative z-10">
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#00C8FF] text-[#00C8FF]" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-300 mb-6 italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00C8FF] to-[#0080FF] flex items-center justify-center shadow-lg shadow-[#00C8FF]/30">
                    <span className="text-white text-xl">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
