'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import Modal from '@/components/admin/Modal';
import ImageUpload from '@/components/admin/ImageUpload';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { ITeamMember } from '@/types';

const EMPTY: Partial<ITeamMember> = { name: '', role: '', bio: '', email: '', linkedin: '', order: 0, isActive: true };

export default function TeamAdminPage() {
  const [members, setMembers] = useState<ITeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal,   setModal]   = useState(false);
  const [editing, setEditing] = useState<Partial<ITeamMember>>(EMPTY);
  const [isEdit,  setIsEdit]  = useState(false);

  const load = async () => {
    setLoading(true);
    const res = await fetch('/api/team');
    const data = await res.json();
    setMembers(data.team ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew  = () => { setEditing(EMPTY); setIsEdit(false); setModal(true); };
  const openEdit = (m: ITeamMember) => { setEditing(m); setIsEdit(true); setModal(true); };

  const save = async () => {
    const url    = isEdit ? `/api/team/${editing._id}` : '/api/team';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
    if (!res.ok) { toast.error('Failed to save'); return; }
    toast.success(isEdit ? 'Member updated' : 'Member added');
    setModal(false);
    load();
  };

  const del = async (id: string) => {
    if (!confirm('Remove this team member?')) return;
    await fetch(`/api/team/${id}`, { method: 'DELETE' });
    toast.success('Removed');
    load();
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-60">
        <Header title="Team Members" subtitle="Manage your team profiles" />
        <main className="p-6">
          <div className="admin-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-700">{members.length} members</h2>
              <button onClick={openNew} className="btn-primary text-sm py-2"><Plus size={16} /> Add Member</button>
            </div>
            {loading ? (
              <p className="text-sm text-slate-400 py-8 text-center">Loading…</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {members.map((m) => (
                  <div key={m._id} className="border border-slate-200 rounded-xl p-4 flex gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-primary-100 shrink-0 flex items-center justify-center">
                      {m.image
                        ? <Image src={m.image} alt={m.name} width={48} height={48} className="object-cover" />
                        : <span className="text-primary-700 font-bold">{m.name[0]}</span>
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 text-sm truncate">{m.name}</p>
                      <p className="text-xs text-primary-700">{m.role}</p>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{m.bio}</p>
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => openEdit(m)} className="text-xs text-primary-700 hover:underline flex items-center gap-1">
                          <Edit2 size={11} /> Edit
                        </button>
                        <button onClick={() => del(m._id)} className="text-xs text-red-500 hover:underline flex items-center gap-1">
                          <Trash2 size={11} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={isEdit ? 'Edit Member' : 'Add Team Member'}>
        <div className="space-y-4">
          <div><label className="admin-label">Full Name *</label>
            <input className="admin-input" value={editing.name ?? ''} onChange={e => setEditing(p => ({ ...p, name: e.target.value }))} /></div>
          <div><label className="admin-label">Role / Title *</label>
            <input className="admin-input" value={editing.role ?? ''} onChange={e => setEditing(p => ({ ...p, role: e.target.value }))} /></div>
          <div><label className="admin-label">Bio *</label>
            <textarea className="admin-input" rows={3} value={editing.bio ?? ''} onChange={e => setEditing(p => ({ ...p, bio: e.target.value }))} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="admin-label">Email</label>
              <input className="admin-input" type="email" value={editing.email ?? ''} onChange={e => setEditing(p => ({ ...p, email: e.target.value }))} /></div>
            <div><label className="admin-label">LinkedIn URL</label>
              <input className="admin-input" value={editing.linkedin ?? ''} onChange={e => setEditing(p => ({ ...p, linkedin: e.target.value }))} /></div>
          </div>
          <div><label className="admin-label">Display Order</label>
            <input type="number" className="admin-input" value={editing.order ?? 0} onChange={e => setEditing(p => ({ ...p, order: +e.target.value }))} /></div>
          <div><label className="admin-label">Profile Photo</label>
            <ImageUpload value={editing.image} onChange={url => setEditing(p => ({ ...p, image: url }))} /></div>
          <div className="flex gap-3 pt-2">
            <button onClick={save} className="btn-primary flex-1 justify-center">Save</button>
            <button onClick={() => setModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
