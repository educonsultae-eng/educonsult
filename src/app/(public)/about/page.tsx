import type { Metadata } from 'next';
import Link from 'next/link';
import SafeImage from '@/components/public/SafeImage';
import CTASection from '@/components/public/CTASection';
import TeamCard from '@/components/public/TeamCard';
import { ITeamMember } from '@/types';
import { CheckCircle, Target, Eye, ArrowRight, Mic, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — Shamaila Shah & EduConsult',
  description: 'EduConsult is led by Shamaila Shah — international education speaker, IB specialist, and school improvement expert with over 15 years of GCC and global experience.',
};

async function getTeam(): Promise<ITeamMember[]> {
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
    const res = await fetch(`${base}/api/team`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.team ?? [];
  } catch {
    return [];
  }
}

const VALUES = [
  'Evidence-based practice in everything we do',
  'Respect for cultural context across the GCC',
  'Empowering local educators, not replacing them',
  'Long-term partnership over short-term fixes',
  'Transparency, integrity and accountability',
  'Female leadership championing diversity',
];

const SPEAKING_HIGHLIGHTS = [
  {
    event:    'BSME TeacherCon DXB25',
    topic:    'The Human Edge in the Age of AI',
    location: 'Dubai, UAE',
    image:    '/images/events/panel-closeup.jpg',
  },
  {
    event:    'IB Global Conference 2025',
    topic:    'IB CORE: Enhancing Achievement through a Research Driven Culture',
    location: 'The Hague, Netherlands',
    image:    '/images/events/ib-conference-presenting.jpg',
  },
];

export default async function AboutPage() {
  const team = await getTeam();

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-0 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center pb-16">
            <div>
              <span className="text-xs font-bold text-primary-700 uppercase tracking-widest">Our Founder</span>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mt-3 mb-6 leading-tight">
                Shamaila Shah
              </h1>
              <p className="text-xl text-primary-700 font-semibold mb-4">
                Founder & Lead Consultant, EduConsult
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                An internationally recognised education leader, IB specialist, and AI-in-education advocate with over 15 years of experience transforming schools across the GCC and beyond.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Currently Head of Curriculum at GEMS Wellington International School — one of Dubai&apos;s top-rated IB schools — Shamaila founded EduConsult to share the evidence-based strategies that have driven consistent, measurable improvement with schools across the wider GCC region.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">
                  Work With Us <ArrowRight size={16} />
                </Link>
                <Link href="/speaking" className="btn-secondary">
                  <Mic size={16} /> Speaking Engagements
                </Link>
              </div>
            </div>

            {/* Founder photo */}
            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-xl">
                <SafeImage
                  src="/images/events/panel-closeup.jpg"
                  alt="Shamaila Shah — Founder of EduConsult"
                  fill
                  className="object-cover object-top"
                  priority
                  fallbackClassName="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center"
                  fallbackContent={
                    <div className="text-center">
                      <div className="w-32 h-32 bg-primary-200 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-primary-700">SS</div>
                      <p className="text-primary-600 font-medium">Shamaila Shah</p>
                    </div>
                  }
                />
              </div>

              {/* Credential badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg border border-slate-200 p-4 max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                    <Globe size={18} className="text-primary-700" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">International Speaker</p>
                    <p className="text-xs text-slate-500">BSME · IB Global Conference</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speaking section */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold text-primary-700 uppercase tracking-widest">Featured Events</span>
              <h2 className="text-3xl font-bold text-slate-900 mt-2">Recognised on the World Stage</h2>
            </div>
            <Link href="/speaking" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-900">
              All events <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {SPEAKING_HIGHLIGHTS.map((s) => (
              <div key={s.event} className="group card overflow-hidden">
                <div className="relative h-52 overflow-hidden">
                  <SafeImage
                    src={s.image}
                    alt={s.event}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    fallbackClassName="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                      {s.event}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 mb-1 group-hover:text-primary-800 transition-colors">
                    &ldquo;{s.topic}&rdquo;
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Globe size={11} /> {s.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/speaking" className="btn-secondary">
              View All Speaking Engagements <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold text-primary-700 uppercase tracking-widest">Our Story</span>
              <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">From the Classroom to Consulting</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  EduConsult was founded by Shamaila Shah after years of leading curriculum innovation at GEMS Wellington International School, Dubai — one of the UAE&apos;s Outstanding IB schools. Having developed strategies that produced measurable, above-global-average results, Shamaila was compelled to share these approaches more broadly.
                </p>
                <p>
                  Invited to speak at the IB Global Conference 2025 in The Hague, and recognised as a thought leader on AI in education at BSME&apos;s TeacherCon DXB25, Shamaila brings globally validated expertise directly to GCC schools.
                </p>
                <p>
                  Today, EduConsult works with school leaders, curriculum teams, and education groups across Dubai, Abu Dhabi, Saudi Arabia, and the wider GCC — delivering the kind of bespoke, research-backed support that produces lasting results.
                </p>
              </div>
            </div>
            <div className="bg-primary-50 rounded-3xl p-8 border border-primary-100">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '15+', label: 'Years in Education' },
                  { value: '2',   label: 'International Conferences' },
                  { value: '16',  label: 'Years GEMS Outstanding' },
                  { value: '5',   label: 'GCC Countries' },
                ].map(({ value, label }) => (
                  <div key={label} className="bg-white rounded-2xl p-5 text-center shadow-sm">
                    <div className="text-3xl font-extrabold text-primary-800 mb-1">{value}</div>
                    <div className="text-xs text-slate-500 font-medium">{label}</div>
                  </div>
                ))}
              </div>

              {/* IB group photo */}
              <div className="mt-5 relative h-40 rounded-2xl overflow-hidden">
                <SafeImage
                  src="/images/events/panel-group-photo.jpg"
                  alt="Panel group at TeacherCon DXB25"
                  fill
                  className="object-cover"
                  fallbackClassName="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center"
                  fallbackContent={<span className="text-primary-300 text-3xl">📸</span>}
                />
              </div>
              <p className="text-xs text-slate-400 text-center mt-2">TeacherCon DXB25 — BSME, Dubai</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                <Target size={22} className="text-primary-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                To partner with schools and education groups across the GCC to achieve sustainable excellence through evidence-based strategies, transformational leadership, and a deep respect for the communities we serve.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                <Eye size={22} className="text-primary-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                A GCC where every child attends an Outstanding school — led by confident, well-supported educators who have the tools, training, and inspiration to change lives every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">What We Stand For</h2>
            <p className="section-subtitle mx-auto">Our values guide every engagement, every recommendation, and every relationship.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {VALUES.map((value) => (
              <div key={value} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                <CheckCircle size={18} className="text-primary-600 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-700 font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      {team.length > 0 && (
        <section className="section-padding bg-slate-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-primary-700 uppercase tracking-widest">Our Experts</span>
              <h2 className="section-title mt-2">Meet the Team</h2>
              <p className="section-subtitle mx-auto">World-class education professionals, each with deep GCC expertise.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <TeamCard key={member._id} member={member} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
