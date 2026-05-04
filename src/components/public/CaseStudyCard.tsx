import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import { ICaseStudy } from '@/types';

interface CaseStudyCardProps {
  study: ICaseStudy;
}

export default function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <article className="card overflow-hidden group">
      {study.image ? (
        <div className="relative h-48 overflow-hidden">
          <Image src={study.image} alt={study.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
          <span className="text-4xl">🏫</span>
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
          <MapPin size={12} className="text-primary-500" />
          {study.location}
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary-800 transition-colors">
          {study.title}
        </h3>

        <p className="text-xs font-semibold text-primary-700 mb-3">{study.school}</p>

        <p className="text-sm text-slate-500 mb-4 line-clamp-2">{study.challenge}</p>

        {study.results?.length > 0 && (
          <div className="space-y-1.5 mb-4">
            {study.results.slice(0, 2).map((r, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                <CheckCircle size={13} className="text-green-500 mt-0.5 shrink-0" />
                {r}
              </div>
            ))}
          </div>
        )}

        <Link
          href={`/case-studies/${study.slug}`}
          className="flex items-center gap-1 text-sm font-semibold text-primary-700 hover:gap-2 transition-all"
        >
          Read full story <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}
