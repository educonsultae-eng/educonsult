import type { Metadata } from 'next';
import ServiceCard from '@/components/public/ServiceCard';
import CTASection from '@/components/public/CTASection';
import { IService } from '@/types';
import { STATIC_SERVICES } from '@/lib/static-services';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Comprehensive education consultancy services for GCC schools — KHDA preparation, curriculum development, leadership coaching, and more.',
};

async function getServices(): Promise<IService[]> {
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
    const res = await fetch(`${base}/api/services?active=true`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.services ?? [];
  } catch {
    return [];
  }
}

export default async function ServicesPage() {
  const dbServices = await getServices();
  const services = dbServices.length > 0 ? dbServices : STATIC_SERVICES;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="container-custom text-center">
          <span className="text-xs font-bold text-primary-700 uppercase tracking-widest">What We Offer</span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mt-3 mb-6 leading-tight">
            Expert Consultancy Services for GCC Schools
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Every service we offer is designed to create lasting, measurable improvement in your school — aligned to KHDA, ADEK, and international best practice.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <ServiceCard key={s._id ?? s.slug} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
