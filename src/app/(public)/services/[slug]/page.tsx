import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, ArrowRight, BookOpen, Award, Users, Cpu, Heart, GraduationCap, type LucideIcon } from 'lucide-react';
import { IService } from '@/types';
import CTASection from '@/components/public/CTASection';
import { getStaticService } from '@/lib/static-services';

const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen, Award, Users, Cpu, Heart, GraduationCap,
};

async function getService(slug: string): Promise<IService | null> {
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
    const res = await fetch(`${base}/api/services/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.service ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const service = (await getService(slug)) ?? getStaticService(slug);
  if (!service) return { title: 'Service Not Found' };
  return { title: service.title, description: service.excerpt };
}

export default async function ServiceDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const service = (await getService(slug)) ?? getStaticService(slug);
  if (!service) notFound();

  const Icon = ICON_MAP[service.icon] ?? BookOpen;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="container-custom">
          <Link href="/services" className="text-sm text-primary-700 hover:text-primary-900 font-medium mb-6 flex items-center gap-1">
            ← Back to Services
          </Link>
          <div className="max-w-3xl">
            <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
              <Icon size={26} className="text-primary-700" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              {service.title}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">{service.excerpt}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {service.image && (
                <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-8">
                  <Image src={service.image} alt={service.title} fill className="object-cover" />
                </div>
              )}
              <div className="prose-content">
                <div dangerouslySetInnerHTML={{ __html: service.description }} />
              </div>
            </div>

            <aside className="space-y-6">
              {service.features?.length > 0 && (
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4">What&apos;s Included</h3>
                  <ul className="space-y-3">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-slate-600">
                        <CheckCircle size={16} className="text-primary-600 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="bg-primary-800 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Ready to Get Started?</h3>
                <p className="text-primary-200 text-sm mb-4">Book a free consultation with our team to discuss how we can help your school.</p>
                <Link href="/contact" className="btn-white w-full justify-center text-sm py-3">
                  Book Free Consultation <ArrowRight size={15} />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
