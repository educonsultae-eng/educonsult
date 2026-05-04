import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  icon: string;
  image?: string;
  features: string[];
  isActive: boolean;
  order: number;
}

const ServiceSchema = new Schema<IService>(
  {
    title:       { type: String, required: true, trim: true },
    slug:        { type: String, required: true, unique: true, lowercase: true },
    excerpt:     { type: String, required: true },
    description: { type: String, required: true },
    icon:        { type: String, default: 'BookOpen' },
    image:       { type: String },
    features:    [{ type: String }],
    isActive:    { type: Boolean, default: true },
    order:       { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
