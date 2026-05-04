import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Shield, TrendingUp, Users, FileCheck } from 'lucide-react';
import CTASection from '@/components/public/CTASection';

export const metadata: Metadata = {
  title: 'School Improvement & KHDA Preparation',
  description: 'Expert KHDA inspection preparation and school improvement support for Dubai schools. Achieve Outstanding with EduConsult.',
};

const KHDA_DOMAINS = [
  "Students' Achievement",
  "Students' Personal and Social Development",
  "Teaching and Learning",
  "Curriculum",
  "The Protection, Care, Guidance and Support of Students",
  "Leadership and Management",
];

const PROCESS = [
  { icon: FileCheck, title: 'School Audit',      desc: 'Comprehensive baseline assessment across all KHDA domains to identify strengths and areas for development.' },
  { icon: TrendingUp, title: 'Action Planning',  desc: 'Co-creation of a detailed, measurable School Development Plan with clear priorities and timelines.' },
  { icon: Users,      title: 'Capacity Building', desc: 'Targeted professional development, coaching, and mentoring for leaders and teachers at every level.' },
  { icon: Shield,     title: 'Mock Inspection',   desc: 'Rigorous simulated KHDA inspection with detailed feedback reports to prepare your team with confidence.' },
];

export default function SchoolImprovementPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-900 to-primary-800">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold text-primary-300 uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full mb-6">
              KHDA Specialists
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              School Improvement & KHDA Inspection Preparation
            </h1>
            <p className="text-lg text-primary-200 leading-relaxed mb-8">
              Led by former KHDA inspectors, our school improvement programme gives Dubai schools the strategy, support, and confidence to achieve Outstanding. 95% of our clients improve their KHDA grade.
            </p>
            <Link href="/contact" className="btn-white text-base px-8 py-4">
              Book Free School Audit <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* KHDA Domains */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-primary-700 uppercase tracking-widest">The Framework</span>
              <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-4">We Cover All Six KHDA Inspection Domains</h2>
              <p className="text-slate-600 mb-8">
                Our ex-inspector team knows exactly what KHDA inspectors look for in each domain. We prepare your school comprehensively across all six areas.
              </p>
              <ul className="space-y-3">
                {KHDA_DOMAINS.map((domain) => (
                  <li key={domain} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle size={18} className="text-primary-600 shrink-0" />
                    <span className="font-medium">{domain}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-primary-50 rounded-3xl p-8 border border-primary-100">
              <div className="text-center mb-8">
                <div className="text-5xl font-extrabold text-primary-800 mb-2">95%</div>
                <p className="text-slate-600">of our client schools improve their KHDA grade</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { grade: 'Outstanding', count: '40+', color: 'bg-green-100 text-green-800' },
                  { grade: 'Very Good',   count: '35+', color: 'bg-blue-100 text-blue-800' },
                  { grade: 'Good',        count: '20+', color: 'bg-yellow-100 text-yellow-800' },
                  { grade: 'Acceptable',  count: '5+',  color: 'bg-orange-100 text-orange-800' },
                ].map(({ grade, count, color }) => (
                  <div key={grade} className="bg-white rounded-xl p-4 text-center shadow-sm">
                    <div className="text-2xl font-bold text-slate-900">{count}</div>
                    <div className={`text-xs font-semibold px-2 py-1 rounded-full mt-1 ${color}`}>{grade}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Proven 4-Step Process</h2>
            <p className="section-subtitle mx-auto">A structured, evidence-based approach that delivers consistent results.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary-800 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {i + 1}
                </div>
                <div className="w-11 h-11 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={20} className="text-primary-700" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
