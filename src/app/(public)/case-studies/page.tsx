import type { Metadata } from 'next';
import CaseStudyCard from '@/components/public/CaseStudyCard';
import CTASection from '@/components/public/CTASection';
import { ICaseStudy } from '@/types';

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

      <section className="section-padding bg-white">
        <div className="container-custom">
          {studies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studies.map((study) => (
                <CaseStudyCard key={study._id} study={study} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-slate-400">Case studies will be added shortly. Contact us to learn more about our results.</p>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
