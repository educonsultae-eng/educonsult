'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "EduConsult transformed our school's approach to quality assurance. Within one academic year, we moved from 'Good' to 'Outstanding' in our KHDA inspection. Their expertise and hands-on support was invaluable.",
    author: 'H.E. Dr. Fatima Al-Zaabi',
    role:   'School Principal',
    school: 'Al Nour International School, Dubai',
  },
  {
    quote: "The curriculum development support we received was world-class. Our students' PISA scores improved significantly, and our teachers are now confident, innovative practitioners. I cannot recommend EduConsult highly enough.",
    author: 'Mr. David Harrison',
    role:   'Director of Education',
    school: 'British International Group, UAE',
  },
  {
    quote: "Our leadership team underwent a complete transformation through EduConsult's coaching programme. The impact on staff morale, retention, and ultimately student outcomes has been extraordinary.",
    author: 'Ms. Reem Al-Khouri',
    role:   'CEO, Education Group',
    school: 'Al Nakheel Education, Saudi Arabia',
  },
  {
    quote: "The AI integration strategy they designed for us put our school at the forefront of educational innovation in the region. Parents, students and staff have all responded incredibly positively.",
    author: 'Mr. James Clarke',
    role:   'Head of School',
    school: 'Emirates International Academy, Abu Dhabi',
  },
];

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  return (
    <section className="section-padding bg-primary-900">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Trusted by School Leaders Across the GCC
          </h2>
          <p className="text-primary-200 text-lg">
            Hear what our clients say about partnering with EduConsult
          </p>
        </div>

        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-8 lg:p-12"
            >
              <Quote size={40} className="text-primary-400 mb-6" />

              <blockquote className="text-lg lg:text-xl text-white leading-relaxed mb-8 italic">
                &ldquo;{TESTIMONIALS[current].quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {TESTIMONIALS[current].author[0]}
                </div>
                <div>
                  <div className="text-white font-semibold">{TESTIMONIALS[current].author}</div>
                  <div className="text-primary-300 text-sm">{TESTIMONIALS[current].role}</div>
                  <div className="text-primary-400 text-xs">{TESTIMONIALS[current].school}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center text-white transition-all"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-white w-6' : 'bg-white/30'}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center text-white transition-all"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
