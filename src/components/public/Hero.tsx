'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Phone } from 'lucide-react';

interface HeroProps {
  headline:    string;
  subheadline: string;
  cta:         string;
}

const TRUST_SIGNALS = ['KHDA Inspection Ready', '100+ Schools Served', 'GCC-Wide Expertise'];

export default function Hero({ headline, subheadline, cta }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-white to-primary-50 pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-100 rounded-full opacity-40 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-100 rounded-full opacity-30 blur-3xl" />
      </div>

      <div className="container-custom relative">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-100 rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-primary-800">Dubai&apos;s Premier Education Consultancy</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6"
          >
            {headline}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg lg:text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl"
          >
            {subheadline}
          </motion.p>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            {TRUST_SIGNALS.map((signal) => (
              <div key={signal} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                <CheckCircle size={16} className="text-primary-600" />
                {signal}
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/contact" className="btn-primary text-base px-8 py-4">
              {cta}
              <ArrowRight size={18} />
            </Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971501234567'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-base px-8 py-4"
            >
              <Phone size={18} />
              WhatsApp Us
            </a>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { value: '100+', label: 'Schools Served' },
            { value: '20+', label: 'Years Experience' },
            { value: '95%', label: 'KHDA Outstanding Rate' },
            { value: '5', label: 'GCC Countries' },
          ].map(({ value, label }) => (
            <div key={label} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center">
              <div className="text-3xl font-extrabold text-primary-800 mb-1">{value}</div>
              <div className="text-sm text-slate-500 font-medium">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
