export interface IService {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  icon: string;
  image?: string;
  features: string[];
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ITeamMember {
  _id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  email?: string;
  linkedin?: string;
  order: number;
  isActive: boolean;
}

export interface IBlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  author: string;
  tags: string[];
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ILead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  school?: string;
  position?: string;
  message: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  source?: string;
  notes?: string;
  createdAt: string;
}

export interface ICaseStudy {
  _id: string;
  title: string;
  slug: string;
  school: string;
  location: string;
  challenge: string;
  solution: string;
  results: string[];
  image?: string;
  tags: string[];
  isPublished: boolean;
  createdAt: string;
}

export interface ISettings {
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

export interface IMedia {
  _id: string;
  name: string;
  url: string;
  publicId: string;
  type: string;
  size: number;
  createdAt: string;
}
