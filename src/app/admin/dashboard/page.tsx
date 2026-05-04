'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import StatCard from '@/components/admin/StatCard';
import { Briefcase, Users, FileText, MessageSquare, Globe, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface Stats {
  services:    number;
  team:        number;
  blog:        number;
  leads:       number;
  newLeads:    number;
  caseStudies: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ services: 0, team: 0, blog: 0, leads: 0, newLeads: 0, caseStudies: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/services?active=false').then(r => r.json()),
      fetch('/api/team').then(r => r.json()),
      fetch('/api/blog?all=true').then(r => r.json()),
      fetch('/api/leads').then(r => r.json()),
      fetch('/api/case-studies?all=true').then(r => r.json()),
    ]).then(([s, t, b, l, cs]) => {
      setStats({
        services:    s.services?.length ?? 0,
        team:        t.team?.length ?? 0,
        blog:        b.posts?.length ?? 0,
        leads:       l.leads?.length ?? 0,
        newLeads:    l.leads?.filter((lead: { status: string }) => lead.status === 'new').length ?? 0,
        caseStudies: cs.studies?.length ?? 0,
      });
    }).finally(() => setLoading(false));
  }, []);

  const QUICK_LINKS = [
    { href: '/admin/services',     label: 'Add Service',     color: 'bg-blue-50 text-blue-700 border-blue-100' },
    { href: '/admin/blog',         label: 'Write Blog Post', color: 'bg-purple-50 text-purple-700 border-purple-100' },
    { href: '/admin/team',         label: 'Add Team Member', color: 'bg-green-50 text-green-700 border-green-100' },
    { href: '/admin/leads',        label: 'View Enquiries',  color: 'bg-orange-50 text-orange-700 border-orange-100' },
    { href: '/admin/case-studies', label: 'Add Case Study',  color: 'bg-slate-50 text-slate-700 border-slate-200' },
    { href: '/admin/settings',     label: 'Edit Settings',   color: 'bg-pink-50 text-pink-700 border-pink-100' },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-60">
        <Header title="Dashboard" subtitle="Welcome back — here's your platform overview" />

        <main className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <StatCard title="Services"    value={loading ? '…' : stats.services}    icon={Briefcase}     color="blue" />
            <StatCard title="Team Members" value={loading ? '…' : stats.team}       icon={Users}         color="green" />
            <StatCard title="Blog Posts"  value={loading ? '…' : stats.blog}        icon={FileText}      color="purple" />
            <StatCard title="Total Leads" value={loading ? '…' : stats.leads}       icon={MessageSquare} color="orange" />
            <StatCard title="New Enquiries" value={loading ? '…' : stats.newLeads}  icon={TrendingUp}    color="orange"
              change={stats.newLeads > 0 ? `${stats.newLeads} need attention` : undefined}
            />
            <StatCard title="Case Studies" value={loading ? '…' : stats.caseStudies} icon={Globe}       color="blue" />
          </div>

          {/* Quick links */}
          <div className="admin-card">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {QUICK_LINKS.map(({ href, label, color }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center justify-center px-4 py-3 text-sm font-semibold rounded-xl border transition-all hover:shadow-sm ${color}`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Notice */}
          {stats.newLeads > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {stats.newLeads}
                </div>
                <div>
                  <p className="text-sm font-semibold text-orange-900">New enquiries awaiting response</p>
                  <p className="text-xs text-orange-700">Respond promptly to maximise conversions</p>
                </div>
              </div>
              <Link href="/admin/leads" className="text-sm font-semibold text-orange-700 hover:text-orange-900">
                View now →
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
