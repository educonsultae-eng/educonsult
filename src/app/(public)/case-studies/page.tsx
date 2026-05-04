import type { Metadata } from 'next';
import CaseStudyCard from '@/components/public/CaseStudyCard';
import CTASection from '@/components/public/CTASection';
import { ICaseStudy } from '@/types';
import Link from 'next/link';
import { Award, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Case Studies & Success Stories',
  description: 'Real-world school improvement results from our work with GCC schools — before, during, and after our engagement.',
};

async function getStudies(): Promise<ICaseStudy[]> {
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
    const res = await fetch(`${base}/api/case-studies`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.studies ?? [];
  } catch {
    return [];
  }
}

export default async function CaseStudiesPage() {
  const studies = await getStudies();

  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="container-custom">
          <span className="text-xs font-bold text-primary-700 uppercase tracking-widest">Success Stories</span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mt-3 mb-4">
            Real Results, Real Schools
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Our case studies demonstrate the tangible, lasting impact we create in partnership with schools across the GCC.
          </p>
        </div>
      </section>

      {/* Featured: DEWA Business Cup */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mb-10">
            <span className="text-xs font-bold text-primary-700 uppercase tracking-widest">Featured Achievement</span>
            <h2 className="section-title mt-2">Award-Winning Student Outcomes</h2>
          </div>
          <div className="bg-gradient-to-br from-primary-50 to-blue-50 border border-primary-100 rounded-3xl p-8 lg:p-12 mb-12">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                  <Award size={13} /> 1st Place + Best AI Solution Award
                </div>
                <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mb-3 leading-tight">
                  DEWA Business Cup Challenge 2019
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Under the mentorship of Shamaila Shah (Curriculum Leader, Business & Economics), Team Carv from GEMS Wellington International School won first place in the DEWA Business Cup Challenge — competing against 1,200 students from 60 UAE schools. The team also received the separate <strong>Best AI Solution Award</strong> for their innovative application of artificial intelligence to a real-world DEWA business case.
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  &ldquo;We at GEMS Wellington International School are extremely proud of Team Carv for winning the DEWA Business Cup Challenge.&rdquo;
                  <span className="block text-sm text-slate-400 mt-1">— Shamaila Shah, Curriculum Leader for Business and Economics</span>
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['AI in Education', 'Student Achievement', 'Business Curriculum', 'GEMS Wellington', 'DEWA', 'UAE Schools'].map(t => (
                    <span key={t} className="badge bg-primary-100 text-primary-700">{t}</span>
                  ))}
                </div>
                <a
                  href="https://gulfnews.com/uae/education/gems-wellington-international-school-wins-business-cup-1.67983260"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-900 transition-colors"
                >
                  Read full Gulf News coverage <ExternalLink size={14} />
                </a>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '1st',   label: 'Place Overall' },
                  { value: '60',    label: 'Schools Competed' },
                  { value: '1,200', label: 'Students Competed' },
                  { value: '2',     label: 'Awards Won' },
                ].map(({ value, label }) => (
                  <div key={label} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-primary-100">
                    <div className="text-3xl font-extrabold text-primary-800 mb-1">{value}</div>
                    <div className="text-xs text-slate-500 font-medium">{label}</div>
                  </div>
                ))}
                <div className="col-span-2 bg-white rounded-2xl p-5 border border-primary-100 shadow-sm">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Prizes Awarded</p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>🏆 First Place Trophy & National Bonds</li>
                    <li>🤖 Best AI Solution Award</li>
                    <li>💼 DEWA & Hunter Foods Internships</li>
                    <li>🎓 Curtin University Dubai Scholarships</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* DB case studies */}
          {studies.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studies.map((study) => (
                <CaseStudyCard key={study._id} study={study} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
