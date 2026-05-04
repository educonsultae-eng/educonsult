'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import Modal from '@/components/admin/Modal';
import { Eye, Trash2, Mail, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import { ILead } from '@/types';
import { formatDate } from '@/lib/utils';

const STATUS_COLORS: Record<string, string> = {
  new:       'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  converted: 'bg-green-100 text-green-800',
  closed:    'bg-slate-100 text-slate-600',
};

export default function LeadsAdminPage() {
  const [leads,   setLeads]   = useState<ILead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ILead | null>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch('/api/leads');
    const data = await res.json();
    setLeads(data.leads ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/leads/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    if (selected?._id === id) setSelected(prev => prev ? { ...prev, status: status as ILead['status'] } : null);
    load();
  };

  const del = async (id: string) => {
    if (!confirm('Delete this lead?')) return;
    await fetch(`/api/leads/${id}`, { method: 'DELETE' });
    toast.success('Lead deleted');
    setSelected(null);
    load();
  };

  const newCount = leads.filter(l => l.status === 'new').length;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-60">
        <Header title="Leads & Enquiries" subtitle="Manage incoming contact form submissions" />
        <main className="p-6">
          {newCount > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-blue-800 font-medium">
              🔔 {newCount} new {newCount === 1 ? 'enquiry' : 'enquiries'} awaiting response
            </div>
          )}

          <div className="admin-card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="table-header">Name</th>
                    <th className="table-header">School</th>
                    <th className="table-header">Contact</th>
                    <th className="table-header">Received</th>
                    <th className="table-header">Status</th>
                    <th className="table-header text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={6} className="table-cell text-center text-slate-400 py-8">Loading…</td></tr>
                  ) : leads.length === 0 ? (
                    <tr><td colSpan={6} className="table-cell text-center text-slate-400 py-8">No enquiries yet.</td></tr>
                  ) : leads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-slate-50">
                      <td className="table-cell font-medium text-slate-900">{lead.name}</td>
                      <td className="table-cell text-slate-500">{lead.school ?? '—'}</td>
                      <td className="table-cell">
                        <div className="flex flex-col gap-1">
                          <a href={`mailto:${lead.email}`} className="text-xs text-primary-700 flex items-center gap-1 hover:underline">
                            <Mail size={11} /> {lead.email}
                          </a>
                          {lead.phone && (
                            <a href={`tel:${lead.phone}`} className="text-xs text-slate-500 flex items-center gap-1 hover:underline">
                              <Phone size={11} /> {lead.phone}
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="table-cell text-slate-500 whitespace-nowrap text-xs">{lead.createdAt ? formatDate(lead.createdAt) : '—'}</td>
                      <td className="table-cell">
                        <select
                          value={lead.status}
                          onChange={e => updateStatus(lead._id, e.target.value)}
                          className={`text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer ${STATUS_COLORS[lead.status]}`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="converted">Converted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="table-cell text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => setSelected(lead)} className="p-1.5 text-slate-400 hover:text-primary-700 hover:bg-primary-50 rounded-lg">
                            <Eye size={15} />
                          </button>
                          <button onClick={() => del(lead._id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Lead detail modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Enquiry Details">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                ['Name',     selected.name],
                ['Email',    selected.email],
                ['Phone',    selected.phone ?? '—'],
                ['School',   selected.school ?? '—'],
                ['Position', selected.position ?? '—'],
                ['Received', selected.createdAt ? formatDate(selected.createdAt) : '—'],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="admin-label">{label}</p>
                  <p className="text-sm text-slate-800 font-medium">{value}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="admin-label">Message</p>
              <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-700 border border-slate-200">{selected.message}</div>
            </div>
            <div className="flex gap-3">
              <a href={`mailto:${selected.email}`} className="btn-primary flex-1 justify-center text-sm py-2.5">
                <Mail size={15} /> Reply by Email
              </a>
              <button onClick={() => del(selected._id)} className="px-4 py-2.5 text-red-600 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-50">
                Delete
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
