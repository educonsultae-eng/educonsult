import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import ContactForm from '@/components/public/ContactForm';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with EduConsult to book a free consultation for your school.',
};

const CONTACT_INFO = [
  { icon: Phone,   label: 'Phone',   value: '+971 4 000 0000',     href: 'tel:+97140000000' },
  { icon: Mail,    label: 'Email',   value: 'info@educonsult.ae',  href: 'mailto:info@educonsult.ae' },
  { icon: MapPin,  label: 'Office',  value: 'Dubai, UAE',          href: '#' },
  { icon: Clock,   label: 'Hours',   value: 'Sun–Thu: 8am – 6pm',  href: null },
];

export default function ContactPage() {
  return (
    <>
      <Toaster position="top-right" />

      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="container-custom text-center">
          <span className="text-xs font-bold text-primary-700 uppercase tracking-widest">Contact</span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mt-3 mb-4">
            Let&apos;s Transform Your School Together
          </h1>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            Book a free 30-minute consultation or simply send us a message — we respond to every enquiry within one business day.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Contact form */}
            <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Send Us a Message</h2>
              <p className="text-slate-500 text-sm mb-8">Fill in the form below and our team will be in touch shortly.</p>
              <ContactForm />
            </div>

            {/* Info panel */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-5">Contact Information</h3>
                <ul className="space-y-5">
                  {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                    <li key={label} className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                        <Icon size={16} className="text-primary-700" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium">{label}</p>
                        {href ? (
                          <a href={href} className="text-sm text-slate-700 font-semibold hover:text-primary-700 transition-colors">{value}</a>
                        ) : (
                          <p className="text-sm text-slate-700 font-semibold">{value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971501234567'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-green-50 border border-green-200 rounded-2xl p-5 hover:bg-green-100 transition-colors"
              >
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shrink-0">
                  <MessageCircle size={22} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">WhatsApp Us Directly</p>
                  <p className="text-xs text-slate-500">Quick response, typically within 1 hour</p>
                </div>
              </a>

              {/* Google Maps embed placeholder */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 h-48 bg-slate-100 flex items-center justify-center">
                <p className="text-sm text-slate-400">Dubai, UAE — Map coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
