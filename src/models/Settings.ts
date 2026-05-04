import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  siteName: string;
  siteTagline: string;
  logo?: string;
  favicon?: string;
  primaryColor: string;
  contactEmail: string;
  contactPhone: string;
  whatsapp: string;
  address: string;
  seoTitle: string;
  seoDescription: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  heroHeadline: string;
  heroSubheadline: string;
  heroCTA: string;
}

const SettingsSchema = new Schema<ISettings>(
  {
    siteName:       { type: String, default: 'EduConsult' },
    siteTagline:    { type: String, default: 'Transforming GCC Schools Through Expert Consultation' },
    logo:           { type: String },
    favicon:        { type: String },
    primaryColor:   { type: String, default: '#1e40af' },
    contactEmail:   { type: String, default: 'info@educonsult.ae' },
    contactPhone:   { type: String, default: '+971 4 000 0000' },
    whatsapp:       { type: String, default: '+971501234567' },
    address:        { type: String, default: 'Dubai, United Arab Emirates' },
    seoTitle:       { type: String, default: 'EduConsult — Premium Education Consultancy in Dubai' },
    seoDescription: { type: String, default: 'Leading education consultancy in the GCC region. We help schools achieve KHDA excellence, improve curriculum, and develop outstanding leadership.' },
    socialLinks: {
      linkedin:  { type: String },
      twitter:   { type: String },
      facebook:  { type: String },
      instagram: { type: String },
    },
    heroHeadline:    { type: String, default: 'Transforming GCC Schools Into Centres of Excellence' },
    heroSubheadline: { type: String, default: 'Expert education consultancy for school improvement, KHDA preparation, curriculum development, and leadership excellence across Dubai, UAE and the wider GCC.' },
    heroCTA:         { type: String, default: 'Book a Free Consultation' },
  },
  { timestamps: true }
);

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);
