'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Award, Users, Cpu, Heart, GraduationCap, Star, type LucideIcon } from 'lucide-react';
import { IService } from '@/types';

const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen,
  Award,
  Users,
  Cpu,
  Heart,
  GraduationCap,
  Star,
};

interface ServiceCardProps {
  service: IService;
  index?:  number;
}

export default function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const Icon = ICON_MAP[service.icon] ?? BookOpen;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/services/${service.slug}`} className="group card p-8 flex flex-col h-full hover:border-primary-200 hover:-translate-y-1 transition-all duration-300">
        <div className="w-12 h-12 bg-primary-50 group-hover:bg-primary-100 rounded-xl flex items-center justify-center mb-5 transition-colors">
          <Icon size={22} className="text-primary-700" />
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-primary-800 transition-colors">
          {service.title}
        </h3>

        <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-1">
          {service.excerpt}
        </p>

        {service.features?.length > 0 && (
          <ul className="space-y-1.5 mb-5">
            {service.features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                {f}
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-1 text-sm font-semibold text-primary-700 group-hover:gap-2 transition-all">
          Learn more <ArrowRight size={15} />
        </div>
      </Link>
    </motion.div>
  );
}
