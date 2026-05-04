import Hero from '@/components/public/Hero';
import ServiceCard from '@/components/public/ServiceCard';
import TestimonialSlider from '@/components/public/TestimonialSlider';
import BlogCard from '@/components/public/BlogCard';
import CTASection from '@/components/public/CTASection';
import { IService, IBlogPost, ISettings } from '@/types';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Award, TrendingUp } from 'lucide-react';

async function getData() {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  try {
    const [settingsRes, servicesRes, blogRes] = await Promise.all([
      fetch(`${base}/api/settings`,              { next: { revalidate: 60 } }),
      fetch(`${base}/api/services?active=true`,  { next: { revalidate: 60 } }),
      fetch(`${base}/api/blog`,                  { next: { revalidate: 60 } }),
    ]);

    const { settings } = (settingsRes.ok ? await settingsRes.json() : { settings: {} }) as { settings: ISettings };
    const { services } = (servicesRes.ok ? await servicesRes.json() : { services: [] }) as { services: IService[] };
    const { posts }    = (blogRes.ok ? await blogRes.json() : { posts: [] }) as { posts: IBlogPost[] };

    return { settings: settings ?? {}, services: services ?? [], posts: posts ?? [] };
  } catch {
    return { settings: {} as ISettings, services: [] as IService[], posts: [] as IBlogPost[] };
  }
}

export default async function HomePage() {
  const { settings, services, posts } = await getData();

  const WHY_US = [
    { icon: ShieldCheck, title: 'KHDA-Certified Experts',    desc: 'Former inspectors and senior education leaders with deep KHDA framework knowledge.' },
    { icon: Award,       title: 'Proven Track Record',       desc: '95% of our client schools improve their inspection grade within one academic year.' },
    { icon: TrendingUp,  title: 'Data-Driven Strategies',    desc: 'Every recommendation is grounded in evidence and aligned to UAE educational standards.' },
  ];

  return (
    <>
      <Hero
        headline={settings?.heroHeadline    ?? 'Transforming GCC Schools Into Centres of Excellence'}
        subheadline={settings?.heroSubheadline ?? 'Expert education consultancy for school improvement, KHDA preparation, curriculum development, and leadership excellence.'}
        cta={settings?.heroCTA ?? 'Book a Free Consultation'}
      />

      {/* Services */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-primary-700 uppercase tracking-widest">What We Offer</span>
            <h2 className="section-title mt-2">Comprehensive Education Consultancy Services</h2>
            <p className="section-subtitle mx-auto">
              From KHDA inspection preparation to AI integration — we cover every dimension of school excellence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(services.slice(0, 6)).map((s, i) => (
              <ServiceCard key={s._id} service={s} index={i} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="btn-secondary">
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-primary-700 uppercase tracking-widest">Why EduConsult</span>
            <h2 className="section-title mt-2">The GCC&rsquo;s Most Trusted Education Partners</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WHY_US.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center px-4">
                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-primary-700" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSlider />

      {/* Blog */}
      {posts.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-xs font-bold text-primary-700 uppercase tracking-widest">Insights</span>
                <h2 className="section-title mt-1">Latest from Our Experts</h2>
              </div>
              <Link href="/blog" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-900">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.slice(0, 3).map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <CTASection />

      {/* Region badges */}
      <section className="py-10 bg-white border-t border-slate-100">
        <div className="container-custom">
          <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">Serving Schools Across</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {['Dubai', 'Abu Dhabi', 'Sharjah', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain', 'Oman'].map((r) => (
              <span key={r} className="px-5 py-2 bg-slate-100 text-slate-600 text-sm font-medium rounded-full hover:bg-primary-50 hover:text-primary-700 transition-colors cursor-default">
                {r}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
