import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title:   string;
  value:   string | number;
  icon:    LucideIcon;
  change?: string;
  color?:  'blue' | 'green' | 'purple' | 'orange';
}

const COLOR_MAP = {
  blue:   'bg-blue-50 text-blue-700',
  green:  'bg-green-50 text-green-700',
  purple: 'bg-purple-50 text-purple-700',
  orange: 'bg-orange-50 text-orange-700',
};

export default function StatCard({ title, value, icon: Icon, change, color = 'blue' }: StatCardProps) {
  return (
    <div className="admin-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{title}</p>
          <p className="text-3xl font-extrabold text-slate-900">{value}</p>
          {change && <p className="text-xs text-green-600 font-medium mt-1">{change}</p>}
        </div>
        <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', COLOR_MAP[color])}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}
