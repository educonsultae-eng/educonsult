import mongoose, { Schema, Document } from 'mongoose';

export interface ICaseStudy extends Document {
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
}

const CaseStudySchema = new Schema<ICaseStudy>(
  {
    title:       { type: String, required: true, trim: true },
    slug:        { type: String, required: true, unique: true, lowercase: true },
    school:      { type: String, required: true },
    location:    { type: String, required: true },
    challenge:   { type: String, required: true },
    solution:    { type: String, required: true },
    results:     [{ type: String }],
    image:       { type: String },
    tags:        [{ type: String }],
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.CaseStudy || mongoose.model<ICaseStudy>('CaseStudy', CaseStudySchema);
