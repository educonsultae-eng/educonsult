import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-r from-primary-800 to-primary-900">
      <div className="container-custom text-center">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 tracking-tight">
          Ready to Transform Your School?
        </h2>
        <p className="text-primary-200 text-lg mb-10 max-w-xl mx-auto">
          Book a free 30-minute consultation with one of our senior consultants to discuss how we can help your school achieve its full potential.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="btn-white text-base px-8 py-4">
            Book Free Consultation <ArrowRight size={18} />
          </Link>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971501234567'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-white/60 hover:bg-white/10 transition-all text-base"
          >
            <Phone size={18} /> WhatsApp Us Now
          </a>
        </div>
      </div>
    </section>
  );
}
