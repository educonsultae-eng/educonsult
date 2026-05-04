'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface ImageUploadProps {
  value?:    string;
  onChange:  (url: string) => void;
  folder?:   string;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [loading, setLoading]   = useState(false);
  const [preview, setPreview]   = useState(value ?? '');
  const inputRef                = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file) return;

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) { toast.error('Image must be under 5MB'); return; }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setPreview(data.url);
      onChange(data.url);
      toast.success('Image uploaded');
    } catch {
      toast.error('Upload failed. Check Cloudinary settings.');
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const clear = () => { setPreview(''); onChange(''); };

  return (
    <div className="space-y-3">
      {preview ? (
        <div className="relative w-full h-48 rounded-xl overflow-hidden border border-slate-200">
          <Image src={preview} alt="Preview" fill className="object-cover" />
          <button
            type="button"
            onClick={clear}
            className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="w-full h-40 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-all"
        >
          {loading ? (
            <Loader2 size={24} className="text-primary-600 animate-spin" />
          ) : (
            <>
              <Upload size={24} className="text-slate-400" />
              <p className="text-sm text-slate-500">Click or drag to upload</p>
              <p className="text-xs text-slate-400">PNG, JPG, WebP (max 5MB)</p>
            </>
          )}
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
    </div>
  );
}
