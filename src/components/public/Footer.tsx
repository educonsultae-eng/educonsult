import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

const SERVICES = [
  { label: 'School Improvement & KHDA', href: '/services/school-improvement-khda-preparation' },
  { label: 'Curriculum Development',    href: '/services/curriculum-development' },
  { label: 'Leadership Consulting',     href: '/services/leadership-management-consulting' },
  { label: 'Innovation & AI',           href: '/services/innovation-ai-in-education' },
  { label: 'Student Wellbeing',         href: '/services/student-wellbeing-pastoral-care' },
  { label: 'Teacher Training & CPD',    href: '/services/teacher-training-cpd' },
];

const LINKS = [
  { label: 'About Us',     href: '/about' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Insights',     href: '/blog' },
  { label: 'Contact',      href: '/contact' },
  { label: 'School Improvement', href: '/school-improvement' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EC</span>
              </div>
              <span className="text-xl font-bold text-white">
                Edu<span className="text-primary-400">Consult</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Premium education consultancy transforming GCC schools through expert guidance, evidence-based strategies, and inspirational leadership development.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Linkedin,  href: '#' },
                { Icon: Twitter,   href: '#' },
                { Icon: Facebook,  href: '#' },
                { Icon: Instagram, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 bg-slate-800 hover:bg-primary-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Our Services</h3>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2.5">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-primary-400 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-400">Dubai, United Arab Emirates</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-primary-400 shrink-0" />
                <a href="tel:+97140000000" className="text-sm text-slate-400 hover:text-white transition-colors">+971 4 000 0000</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-primary-400 shrink-0" />
                <a href="mailto:info@educonsult.ae" className="text-sm text-slate-400 hover:text-white transition-colors">info@educonsult.ae</a>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-primary-900/40 border border-primary-800/30 rounded-xl">
              <p className="text-xs text-slate-400 mb-2 font-medium">Serving schools across</p>
              <div className="flex flex-wrap gap-2">
                {['Dubai', 'Abu Dhabi', 'Saudi Arabia', 'Qatar', 'Kuwait'].map((region) => (
                  <span key={region} className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded-md">
                    {region}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} EduConsult. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms"   className="hover:text-white transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
