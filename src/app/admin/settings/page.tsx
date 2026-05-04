'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import ImageUpload from '@/components/admin/ImageUpload';
import { Save, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { ISettings } from '@/types';

const DEFAULT: Partial<ISettings> = {
  siteName:        'EduConsult',
  siteTagline:     'Transforming GCC Schools Through Expert Consultation',
  primaryColor:    '#1e40af',
  contactEmail:    'info@educonsult.ae',
  contactPhone:    '+971 4 000 0000',
  whatsapp:        '+971501234567',
  address:         'Dubai, United Arab Emirates',
  seoTitle:        'EduConsult — Premium Education Consultancy in Dubai',
  seoDescription:  'Leading education consultancy in the GCC region.',
  heroHeadline:    'Transforming GCC Schools Into Centres of Excellence',
  heroSubheadline: 'Expert education consultancy for school improvement, KHDA preparation, curriculum development, and leadership excellence across Dubai, UAE and the wider GCC.',
  heroCTA:         'Book a Free Consultation',
  socialLinks:     {},
};

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<Partial<ISettings>>(DEFAULT);
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(data => {
      if (data.settings) setSettings(data.settings);
      setLoading(false);
    });
  }, []);

  const set = (key: string, value: string) => setSettings(p => ({ ...p, [key]: value }));
  const setSocial = (key: string, value: string) =>
    setSettings(p => ({ ...p, socialLinks: { ...(p.socialLinks ?? {}), [key]: value } }));

  const save = async () => {
    setSaving(true);
    const res = await fetch('/api/settings', {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(settings),
    });
    if (!res.ok) { toast.error('Save failed'); setSaving(false); return; }
    toast.success('Settings saved successfully');
    setSaving(false);
  };

  const Field = ({ label, id, type = 'text', placeholder = '' }: { label: string; id: keyof ISettings; type?: string; placeholder?: string }) => (
    <div>
      <label className="admin-label">{label}</label>
      <input
        type={type}
        className="admin-input"
        value={(settings[id] as string) ?? ''}
        onChange={e => set(id, e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 ml-60 flex items-center justify-center">
          <Loader2 size={32} className="text-primary-600 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-60">
        <Header title="Site Settings" subtitle="Manage your website content, SEO, and contact details" />

        <main className="p-6 space-y-6 max-w-4xl">
          {/* Branding */}
          <div className="admin-card">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-5">Branding</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Site Name"    id="siteName" />
              <Field label="Site Tagline" id="siteTagline" />
              <Field label="Primary Colour (hex)" id="primaryColor" placeholder="#1e40af" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
              <div>
                <label className="admin-label">Logo</label>
                <ImageUpload value={settings.logo} onChange={url => set('logo', url)} />
              </div>
              <div>
                <label className="admin-label">Favicon</label>
                <ImageUpload value={settings.favicon} onChange={url => set('favicon', url)} />
              </div>
            </div>
          </div>

          {/* Hero */}
          <div className="admin-card">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-5">Homepage Hero</h2>
            <div className="space-y-4">
              <Field label="Hero Headline"    id="heroHeadline" />
              <div>
                <label className="admin-label">Hero Subheadline</label>
                <textarea
                  className="admin-input"
                  rows={3}
                  value={settings.heroSubheadline ?? ''}
                  onChange={e => set('heroSubheadline', e.target.value)}
                />
              </div>
              <Field label="CTA Button Text" id="heroCTA" placeholder="Book a Free Consultation" />
            </div>
          </div>

          {/* Contact */}
          <div className="admin-card">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-5">Contact Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Email"     id="contactEmail" type="email" />
              <Field label="Phone"     id="contactPhone" />
              <Field label="WhatsApp"  id="whatsapp" placeholder="+971501234567" />
              <Field label="Address"   id="address" />
            </div>
          </div>

          {/* SEO */}
          <div className="admin-card">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-5">SEO Metadata</h2>
            <div className="space-y-4">
              <Field label="SEO Title" id="seoTitle" />
              <div>
                <label className="admin-label">SEO Description</label>
                <textarea
                  className="admin-input"
                  rows={3}
                  value={settings.seoDescription ?? ''}
                  onChange={e => set('seoDescription', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="admin-card">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-5">Social Media Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {(['linkedin', 'twitter', 'facebook', 'instagram'] as const).map(net => (
                <div key={net}>
                  <label className="admin-label capitalize">{net}</label>
                  <input
                    className="admin-input"
                    placeholder={`https://${net}.com/yourprofile`}
                    value={settings.socialLinks?.[net] ?? ''}
                    onChange={e => setSocial(net, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Save */}
          <div className="flex justify-end">
            <button onClick={save} disabled={saving} className="btn-primary px-8">
              {saving
                ? <><Loader2 size={16} className="animate-spin" /> Saving…</>
                : <><Save size={16} /> Save All Settings</>
              }
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
