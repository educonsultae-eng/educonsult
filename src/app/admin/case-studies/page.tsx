'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import Modal from '@/components/admin/Modal';
import ImageUpload from '@/components/admin/ImageUpload';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { ICaseStudy } from '@/types';

const EMPTY: Partial<ICaseStudy> = {
  title: '', school: '', location: '', challenge: '', solution: '', results: [], tags: [], isPublished: false
};

export default function CaseStudiesAdminPage() {
  const [studies, setStudies] = useState<ICaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal,   setModal]   = useState(false);
  const [editing, setEditing] = useState<Partial<ICaseStudy>>(EMPTY);
  const [isEdit,  setIsEdit]  = useState(false);
  const [resultsStr, setResultsStr] = useState('');
  const [tagsStr,    setTagsStr]    = useState('');

  const load = async () => {
    setLoading(true);
    const res = await fetch('/api/case-studies?all=true');
    const data = await res.json();
    setStudies(data.studies ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew  = () => { setEditing(EMPTY); setResultsStr(''); setTagsStr(''); setIsEdit(false); setModal(true); };
  const openEdit = (s: ICaseStudy) => {
    setEditing(s);
    setResultsStr((s.results ?? []).join('\n'));
    setTagsStr((s.tags ?? []).join(', '));
    setIsEdit(true); setModal(true);
  };

  const save = async () => {
    const payload = {
      ...editing,
      results: resultsStr.split('\n').filter(Boolean),
      tags:    tagsStr.split(',').map(t => t.trim()).filter(Boolean),
    };
    const url    = isEdit ? `/api/case-studies/${editing._id}` : '/api/case-studies';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!res.ok) { toast.error('Save failed'); return; }
    toast.success(isEdit ? 'Updated' : 'Created');
    setModal(false); load();
  };

  const del = async (id: string) => {
    if (!confirm('Delete this case study?')) return;
    await fetch(`/api/case-studies/${id}`, { method: 'DELETE' });
    toast.success('Deleted'); load();
  };

  const togglePublish = async (s: ICaseStudy) => {
    await fetch(`/api/case-studies/${s._id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isPublished: !s.isPublished }),
    }); load();
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-60">
        <Header title="Case Studies" subtitle="Manage your success stories" />
        <main className="p-6">
          <div className="admin-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-700">{studies.length} case studies</h2>
              <button onClick={openNew} className="btn-primary text-sm py-2"><Plus size={16} /> Add Case Study</button>
            </div>
            {loading ? (
              <p className="text-sm text-slate-400 py-8 text-center">Loading…</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="table-header">Title</th>
                    <th className="table-header">School</th>
                    <th className="table-header">Location</th>
                    <th className="table-header">Status</th>
                    <th className="table-header text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {studies.map((s) => (
                    <tr key={s._id} className="hover:bg-slate-50">
                      <td className="table-cell font-medium text-slate-900">{s.title}</td>
                      <td className="table-cell text-slate-500">{s.school}</td>
                      <td className="table-cell text-slate-500">{s.location}</td>
                      <td className="table-cell">
                        <button onClick={() => togglePublish(s)} className="flex items-center gap-1 text-xs">
                          {s.isPublished
                            ? <><Eye size={14} className="text-green-500" /> <span className="text-green-600 font-medium">Published</span></>
                            : <><EyeOff size={14} className="text-slate-400" /> <span className="text-slate-400">Draft</span></>}
                        </button>
                      </td>
                      <td className="table-cell text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openEdit(s)} className="p-1.5 text-slate-400 hover:text-primary-700 hover:bg-primary-50 rounded-lg"><Edit2 size={15} /></button>
                          <button onClick={() => del(s._id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={isEdit ? 'Edit Case Study' : 'Add Case Study'} size="lg">
        <div className="space-y-4">
          <div><label className="admin-label">Title *</label>
            <input className="admin-input" value={editing.title ?? ''} onChange={e => setEditing(p => ({ ...p, title: e.target.value }))} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="admin-label">School Name *</label>
              <input className="admin-input" value={editing.school ?? ''} onChange={e => setEditing(p => ({ ...p, school: e.target.value }))} /></div>
            <div><label className="admin-label">Location *</label>
              <input className="admin-input" value={editing.location ?? ''} onChange={e => setEditing(p => ({ ...p, location: e.target.value }))} /></div>
          </div>
          <div><label className="admin-label">Challenge (the problem) *</label>
            <textarea className="admin-input" rows={3} value={editing.challenge ?? ''} onChange={e => setEditing(p => ({ ...p, challenge: e.target.value }))} /></div>
          <div><label className="admin-label">Our Solution *</label>
            <textarea className="admin-input" rows={3} value={editing.solution ?? ''} onChange={e => setEditing(p => ({ ...p, solution: e.target.value }))} /></div>
          <div><label className="admin-label">Results (one per line)</label>
            <textarea className="admin-input" rows={4} value={resultsStr} onChange={e => setResultsStr(e.target.value)} placeholder="Achieved Outstanding KHDA rating&#10;Student attainment rose by 23%&#10;Staff retention improved to 94%" /></div>
          <div><label className="admin-label">Tags (comma-separated)</label>
            <input className="admin-input" value={tagsStr} onChange={e => setTagsStr(e.target.value)} placeholder="khda, dubai, primary" /></div>
          <div><label className="admin-label">Featured Image</label>
            <ImageUpload value={editing.image} onChange={url => setEditing(p => ({ ...p, image: url }))} /></div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="pub" checked={editing.isPublished ?? false} onChange={e => setEditing(p => ({ ...p, isPublished: e.target.checked }))} className="w-4 h-4 accent-primary-600" />
            <label htmlFor="pub" className="text-sm font-medium text-slate-700">Publish to website</label>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={save} className="btn-primary flex-1 justify-center">Save</button>
            <button onClick={() => setModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
