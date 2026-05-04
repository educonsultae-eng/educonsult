'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import Modal from '@/components/admin/Modal';
import ImageUpload from '@/components/admin/ImageUpload';
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight, GripVertical } from 'lucide-react';
import toast from 'react-hot-toast';
import { IService } from '@/types';

const ICONS = ['BookOpen', 'Award', 'Users', 'Cpu', 'Heart', 'GraduationCap', 'Star', 'Globe', 'TrendingUp'];
const EMPTY: Partial<IService> = { title: '', excerpt: '', description: '', icon: 'BookOpen', features: [], isActive: true, order: 0 };

export default function ServicesAdminPage() {
  const [services, setServices] = useState<IService[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [modal,    setModal]    = useState(false);
  const [editing,  setEditing]  = useState<Partial<IService>>(EMPTY);
  const [isEdit,   setIsEdit]   = useState(false);
  const [featStr,  setFeatStr]  = useState('');

  const load = async () => {
    setLoading(true);
    const res = await fetch('/api/services?active=false');
    const data = await res.json();
    setServices(data.services ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew  = () => { setEditing(EMPTY); setFeatStr(''); setIsEdit(false); setModal(true); };
  const openEdit = (s: IService) => {
    setEditing(s);
    setFeatStr((s.features ?? []).join('\n'));
    setIsEdit(true);
    setModal(true);
  };

  const save = async () => {
    const payload = { ...editing, features: featStr.split('\n').filter(Boolean) };
    const url  = isEdit ? `/api/services/${editing._id}` : '/api/services';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!res.ok) { toast.error('Failed to save service'); return; }

    toast.success(isEdit ? 'Service updated' : 'Service created');
    setModal(false);
    load();
  };

  const del = async (id: string) => {
    if (!confirm('Delete this service?')) return;
    await fetch(`/api/services/${id}`, { method: 'DELETE' });
    toast.success('Service deleted');
    load();
  };

  const toggle = async (s: IService) => {
    await fetch(`/api/services/${s._id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !s.isActive }),
    });
    load();
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-60">
        <Header title="Services" subtitle="Manage your consultancy service offerings" />

        <main className="p-6">
          <div className="admin-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-700">{services.length} services</h2>
              <button onClick={openNew} className="btn-primary text-sm py-2">
                <Plus size={16} /> Add Service
              </button>
            </div>

            {loading ? (
              <p className="text-sm text-slate-400 py-8 text-center">Loading…</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="table-header rounded-tl-lg">Title</th>
                      <th className="table-header">Icon</th>
                      <th className="table-header">Order</th>
                      <th className="table-header">Status</th>
                      <th className="table-header rounded-tr-lg text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((s) => (
                      <tr key={s._id} className="hover:bg-slate-50">
                        <td className="table-cell font-medium text-slate-900">{s.title}</td>
                        <td className="table-cell text-slate-500">{s.icon}</td>
                        <td className="table-cell text-slate-500">{s.order}</td>
                        <td className="table-cell">
                          <button onClick={() => toggle(s)} className="flex items-center gap-1 text-xs">
                            {s.isActive
                              ? <><ToggleRight size={18} className="text-green-500" /> <span className="text-green-600 font-medium">Active</span></>
                              : <><ToggleLeft size={18} className="text-slate-400" />  <span className="text-slate-400">Hidden</span></>
                            }
                          </button>
                        </td>
                        <td className="table-cell text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => openEdit(s)} className="p-1.5 text-slate-400 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors">
                              <Edit2 size={15} />
                            </button>
                            <button onClick={() => del(s._id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal */}
      <Modal isOpen={modal} onClose={() => setModal(false)} title={isEdit ? 'Edit Service' : 'Add Service'} size="lg">
        <div className="space-y-4">
          <div>
            <label className="admin-label">Title *</label>
            <input className="admin-input" value={editing.title ?? ''} onChange={e => setEditing(p => ({ ...p, title: e.target.value }))} />
          </div>
          <div>
            <label className="admin-label">Short Excerpt *</label>
            <textarea className="admin-input" rows={2} value={editing.excerpt ?? ''} onChange={e => setEditing(p => ({ ...p, excerpt: e.target.value }))} />
          </div>
          <div>
            <label className="admin-label">Full Description *</label>
            <textarea className="admin-input" rows={4} value={editing.description ?? ''} onChange={e => setEditing(p => ({ ...p, description: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Icon</label>
              <select className="admin-input" value={editing.icon ?? 'BookOpen'} onChange={e => setEditing(p => ({ ...p, icon: e.target.value }))}>
                {ICONS.map(i => <option key={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="admin-label">Display Order</label>
              <input type="number" className="admin-input" value={editing.order ?? 0} onChange={e => setEditing(p => ({ ...p, order: +e.target.value }))} />
            </div>
          </div>
          <div>
            <label className="admin-label">Features (one per line)</label>
            <textarea className="admin-input" rows={4} value={featStr} onChange={e => setFeatStr(e.target.value)} placeholder="KHDA framework alignment&#10;Mock inspections&#10;Action planning" />
          </div>
          <div>
            <label className="admin-label">Service Image</label>
            <ImageUpload value={editing.image} onChange={url => setEditing(p => ({ ...p, image: url }))} />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <input type="checkbox" id="active" checked={editing.isActive ?? true} onChange={e => setEditing(p => ({ ...p, isActive: e.target.checked }))} className="w-4 h-4 accent-primary-600" />
            <label htmlFor="active" className="text-sm text-slate-700 font-medium">Active (visible on website)</label>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={save} className="btn-primary flex-1 justify-center">Save Service</button>
            <button onClick={() => setModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
