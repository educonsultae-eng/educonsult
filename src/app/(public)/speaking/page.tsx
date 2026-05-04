import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, Mic } from 'lucide-react';
import CTASection from '@/components/public/CTASection';
import SafeImage from '@/components/public/SafeImage';

export const metadata: Metadata = {
  title: 'Speaking & Events',
  description: 'Shamaila Shah — international education speaker and thought leader. Keynote addresses, panel discussions, and workshops across the GCC and globally.',
};

const EVENTS = [
  {
    id: 'bsme-teachercon-dxb25',
    title:   'The Human Edge in the Age of AI',
    event:   'BSME TeacherCon DXB25',
    role:    'Panelist',
    date:    'April 2025',
    location:'Dubai, UAE',
    org:     'British Schools in the Middle East (BSME)',
    summary: 'Invited as a panelist alongside senior education leaders from Amity International School, Fortes Education, and Arcadia British School to discuss how schools can harness the irreplaceable human qualities of teachers and leaders in an AI-driven world.',
    heroImage:    '/images/events/panel-full-stage.jpg',
    galleryImages: [
      '/images/events/panel-discussion.jpg',
      '/images/events/panel-closeup.jpg',
      '/images/events/panel-group-photo.jpg',
    ],
    tags: ['AI in Education', 'Leadership', 'Future of Teaching', 'BSME'],
  },
  {
    id: 'ib-global-conference-2025',
    title:   'IB CORE: Enhancing Achievement through a Research Driven Culture',
    event:   'IB Global Conference 2025',
    role:    'Speaker & Workshop Facilitator',
    date:    'October 2025',
    location:'The Hague, Netherlands',
    org:     'International Baccalaureate (IB)',
    summary: 'Delivered a highly attended session at the IB Global Conference on developing research-driven cultures that measurably improve student outcomes in the IB CORE. Presented data from GEMS Wellington International School showing consistent improvements above global average IB CORE scores from 2022–2025.',
    heroImage:    '/images/events/ib-conference-presenting.jpg',
    galleryImages: [
      '/images/events/ib-conference-slides.jpg',
      '/images/events/ib-conference-room.jpg',
      '/images/events/ib-conference-portrait.jpg',
    ],
    tags: ['IB', 'Research Culture', 'Curriculum', 'Student Achievement', 'Data-Driven'],
  },
];

const PANEL_MEMBERS = [
  { name: 'Olly Lewis',      org: 'Amity International School, Abu Dhabi' },
  { name: 'Dr. Neil Hopkin', org: 'Fortes Education' },
  { name: 'Phil Long',       org: 'Arcadia British School' },
  { name: 'Shamaila Shah',   org: 'GEMS Wellington International School', highlight: true },
];

export default function SpeakingPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-primary-700 uppercase tracking-widest">Speaking & Events</span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mt-3 mb-6 leading-tight">
              Sharing Expertise at the World&apos;s Leading Education Conferences
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Our founder and lead consultant, Shamaila Shah, is a sought-after international speaker on AI in education, research-driven curriculum design, and school improvement strategy — regularly invited to keynote and panel at the region&apos;s most prestigious education events.
            </p>
          </div>
        </div>
      </section>

      {/* Events */}
      {EVENTS.map((ev, idx) => (
        <section key={ev.id} className={`section-padding ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Text */}
              <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                  <Mic size={12} /> {ev.role}
                </div>

                <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mb-3 leading-tight">
                  {ev.title}
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-5">
                  <span className="font-semibold text-slate-700">{ev.event}</span>
                  <span className="flex items-center gap-1"><Calendar size={14} /> {ev.date}</span>
                  <span className="flex items-center gap-1"><MapPin size={14} /> {ev.location}</span>
                </div>

                <p className="text-slate-600 leading-relaxed mb-6">{ev.summary}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {ev.tags.map(t => (
                    <span key={t} className="badge bg-primary-50 text-primary-700">{t}</span>
                  ))}
                </div>

                {/* Panel members (for BSME event) */}
                {ev.id === 'bsme-teachercon-dxb25' && (
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Panel Members</p>
                    <ul className="space-y-2">
                      {PANEL_MEMBERS.map(m => (
                        <li key={m.name} className={`flex items-center gap-3 text-sm ${m.highlight ? 'font-semibold text-primary-800' : 'text-slate-600'}`}>
                          <span className={`w-2 h-2 rounded-full shrink-0 ${m.highlight ? 'bg-primary-600' : 'bg-slate-300'}`} />
                          <span>{m.name}</span>
                          <span className="text-slate-400 text-xs">— {m.org}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Images */}
              <div className={`space-y-4 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                {/* Hero image */}
                <div className="relative w-full h-64 lg:h-80 rounded-2xl overflow-hidden shadow-md">
                  <SafeImage
                    src={ev.heroImage}
                    alt={ev.title}
                    fill
                    className="object-cover"
                    fallbackClassName="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center"
                    fallbackContent={<span className="text-primary-400 text-6xl">🎤</span>}
                  />
                </div>

                {/* Gallery row */}
                <div className="grid grid-cols-3 gap-3">
                  {ev.galleryImages.map((img, i) => (
                    <div key={i} className="relative h-28 rounded-xl overflow-hidden shadow-sm">
                      <SafeImage
                        src={img}
                        alt={`${ev.event} photo ${i + 1}`}
                        fill
                        className="object-cover"
                        fallbackClassName="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Invite to speak */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-primary-50 to-blue-50 border border-primary-100 rounded-3xl p-10 lg:p-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              Invite Shamaila to Speak at Your Event
            </h2>
            <p className="text-slate-600 text-lg mb-8">
              Available for keynotes, panel discussions, and interactive workshops on AI in education, IB curriculum strategy, school improvement, and research-driven teaching culture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-base px-8 py-4">
                Submit Speaking Enquiry <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
