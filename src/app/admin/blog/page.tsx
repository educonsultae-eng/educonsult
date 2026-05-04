'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import Modal from '@/components/admin/Modal';
import ImageUpload from '@/components/admin/ImageUpload';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { IBlogPost } from '@/types';
import { formatDate } from '@/lib/utils';

const EMPTY: Partial<IBlogPost> = { title: '', excerpt: '', content: '', author: '', tags: [], isPublished: false };

export default function BlogAdminPage() {
  const [posts,   setPosts]   = useState<IBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal,   setModal]   = useState(false);
  const [editing, setEditing] = useState<Partial<IBlogPost>>(EMPTY);
  const [isEdit,  setIsEdit]  = useState(false);
  const [tagStr,  setTagStr]  = useState('');

  const load = async () => {
    setLoading(true);
    const res = await fetch('/api/blog?all=true');
    const data = await res.json();
    setPosts(data.posts ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew  = () => { setEditing(EMPTY); setTagStr(''); setIsEdit(false); setModal(true); };
  const openEdit = (p: IBlogPost) => { setEditing(p); setTagStr((p.tags ?? []).join(', ')); setIsEdit(true); setModal(true); };

  const save = async () => {
    const payload = { ...editing, tags: tagStr.split(',').map(t => t.trim()).filter(Boolean) };
    const url    = isEdit ? `/api/blog/${editing.slug ?? ''}` : '/api/blog';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!res.ok) { const e = await res.json(); toast.error(e.error ?? 'Save failed'); return; }
    toast.success(isEdit ? 'Post updated' : 'Post created');
    setModal(false);
    load();
  };

  const del = async (slug: string) => {
    if (!confirm('Delete this post?')) return;
    await fetch(`/api/blog/${slug}`, { method: 'DELETE' });
    toast.success('Post deleted');
    load();
  };

  const togglePublish = async (p: IBlogPost) => {
    await fetch(`/api/blog/${p.slug}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isPublished: !p.isPublished }),
    });
    load();
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-60">
        <Header title="Blog & Insights" subtitle="Create and manage your thought leadership content" />
        <main className="p-6">
          <div className="admin-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-700">{posts.length} posts</h2>
              <button onClick={openNew} className="btn-primary text-sm py-2"><Plus size={16} /> New Post</button>
            </div>
            {loading ? (
              <p className="text-sm text-slate-400 py-8 text-center">Loading…</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="table-header">Title</th>
                    <th className="table-header">Author</th>
                    <th className="table-header">Date</th>
                    <th className="table-header">Status</th>
                    <th className="table-header text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((p) => (
                    <tr key={p._id} className="hover:bg-slate-50">
                      <td className="table-cell font-medium text-slate-900 max-w-xs truncate">{p.title}</td>
                      <td className="table-cell text-slate-500">{p.author}</td>
                      <td className="table-cell text-slate-500 whitespace-nowrap">{p.createdAt ? formatDate(p.createdAt) : '—'}</td>
                      <td className="table-cell">
                        <button onClick={() => togglePublish(p)} className="flex items-center gap-1 text-xs">
                          {p.isPublished
                            ? <><Eye size={14} className="text-green-500" /> <span className="text-green-600 font-medium">Published</span></>
                            : <><EyeOff size={14} className="text-slate-400" /> <span className="text-slate-400">Draft</span></>
                          }
                        </button>
                      </td>
                      <td className="table-cell text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openEdit(p)} className="p-1.5 text-slate-400 hover:text-primary-700 hover:bg-primary-50 rounded-lg">
                            <Edit2 size={15} />
                          </button>
                          <button onClick={() => del(p.slug)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                            <Trash2 size={15} />
                          </button>
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

      <Modal isOpen={modal} onClose={() => setModal(false)} title={isEdit ? 'Edit Post' : 'New Blog Post'} size="xl">
        <div className="space-y-4">
          <div><label className="admin-label">Title *</label>
            <input className="admin-input" value={editing.title ?? ''} onChange={e => setEditing(p => ({ ...p, title: e.target.value }))} /></div>
          <div><label className="admin-label">Short Excerpt *</label>
            <textarea className="admin-input" rows={2} value={editing.excerpt ?? ''} onChange={e => setEditing(p => ({ ...p, excerpt: e.target.value }))} /></div>
          <div>
            <label className="admin-label">Content *</label>
            <RichTextEditor value={editing.content ?? ''} onChange={v => setEditing(p => ({ ...p, content: v }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="admin-label">Author Name *</label>
              <input className="admin-input" value={editing.author ?? ''} onChange={e => setEditing(p => ({ ...p, author: e.target.value }))} /></div>
            <div><label className="admin-label">Tags (comma-separated)</label>
              <input className="admin-input" value={tagStr} onChange={e => setTagStr(e.target.value)} placeholder="khda, school improvement" /></div>
          </div>
          <div><label className="admin-label">Featured Image</label>
            <ImageUpload value={editing.image} onChange={url => setEditing(p => ({ ...p, image: url }))} /></div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="pub" checked={editing.isPublished ?? false} onChange={e => setEditing(p => ({ ...p, isPublished: e.target.checked }))} className="w-4 h-4 accent-primary-600" />
            <label htmlFor="pub" className="text-sm font-medium text-slate-700">Publish immediately</label>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={save} className="btn-primary flex-1 justify-center">Save Post</button>
            <button onClick={() => setModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
