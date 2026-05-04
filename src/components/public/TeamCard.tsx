'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';
import { ITeamMember } from '@/types';

interface TeamCardProps {
  member: ITeamMember;
  index?:  number;
}

export default function TeamCard({ member, index = 0 }: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="card p-6 text-center group"
    >
      <div className="relative w-20 h-20 mx-auto mb-4">
        {member.image ? (
          <Image src={member.image} alt={member.name} fill className="rounded-full object-cover" />
        ) : (
          <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center text-2xl font-bold text-primary-700">
            {member.name.charAt(0)}
          </div>
        )}
      </div>

      <h3 className="font-bold text-slate-900 mb-1">{member.name}</h3>
      <p className="text-sm text-primary-700 font-medium mb-3">{member.role}</p>
      <p className="text-xs text-slate-500 leading-relaxed mb-4">{member.bio}</p>

      <div className="flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
            className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center text-primary-700 hover:bg-primary-100 transition-colors">
            <Linkedin size={14} />
          </a>
        )}
        {member.email && (
          <a href={`mailto:${member.email}`}
            className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center text-primary-700 hover:bg-primary-100 transition-colors">
            <Mail size={14} />
          </a>
        )}
      </div>
    </motion.div>
  );
}
