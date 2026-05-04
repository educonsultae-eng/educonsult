'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import { Upload, Copy, Trash2, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { IMedia } from '@/types';
import { formatDate } from '@/lib/utils';

export default function MediaAdminPage() {
  const [media,    setMedia]    = useState<IMedia[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    setLoading(true);
    const res = await fetch('/api/upload');
    const data = await res.json();
    setMedia(data.media ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!res.ok) { toast.error(`Failed to upload ${file.name}`); }
    }
    toast.success('Upload complete');
    setUploading(false);
    load();
    e.target.value = '';
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard');
  };

  const del = async (id: string) => {
    if (!confirm('Delete this file?')) return;
    await fetch(`/api/upload?id=${id}`, { method: 'DELETE' });
    toast.success('Deleted');
    load();
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / 1048576).toFixed(1)}MB`;
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-60">
        <Header title="Media Library" subtitle="Upload and manage images for your website" />

        <main className="p-6">
          {/* Upload zone */}
          <div className="admin-card mb-6">
            <label className="flex flex-col items-center justify-center h-36 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-all">
              {uploading ? (
                <div className="flex items-center gap-2 text-primary-700">
                  <Loader2 size={20} className="animate-spin" />
                  <span className="text-sm font-medium">Uploading…</span>
                </div>
              ) : (
                <>
                  <Upload size={24} className="text-slate-400 mb-2" />
                  <p className="text-sm font-medium text-slate-500">Click to upload images</p>
                  <p className="text-xs text-slate-400 mt-1">PNG, JPG, WebP — max 5MB each</p>
                </>
              )}
              <input type="file" multiple accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
            </label>
          </div>

          {/* Grid */}
          <div className="admin-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-700">{media.length} files</h2>
            </div>

            {loading ? (
              <p className="text-sm text-slate-400 py-12 text-center">Loading…</p>
            ) : media.length === 0 ? (
              <p className="text-sm text-slate-400 py-12 text-center">No files yet. Upload your first image above.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {media.map((item) => (
                  <div key={item._id} className="group relative border border-slate-200 rounded-xl overflow-hidden">
                    <div className="relative h-28 bg-slate-100">
                      <Image src={item.url} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="p-2">
                      <p className="text-xs text-slate-600 font-medium truncate">{item.name}</p>
                      <p className="text-xs text-slate-400">{formatSize(item.size)}</p>
                      <p className="text-xs text-slate-400">{item.createdAt ? formatDate(item.createdAt) : '—'}</p>
                    </div>
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => copyUrl(item.url)}
                        className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-700 hover:bg-primary-50 transition-colors"
                        title="Copy URL"
                      >
                        <Copy size={14} />
                      </button>
                      <button
                        onClick={() => del(item._id)}
                        className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
