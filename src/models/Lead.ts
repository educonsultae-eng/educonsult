import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  name: string;
  email: string;
  phone?: string;
  school?: string;
  position?: string;
  message: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  source?: string;
  notes?: string;
}

const LeadSchema = new Schema<ILead>(
  {
    name:     { type: String, required: true, trim: true },
    email:    { type: String, required: true, lowercase: true, trim: true },
    phone:    { type: String },
    school:   { type: String },
    position: { type: String },
    message:  { type: String, required: true },
    status:   { type: String, enum: ['new', 'contacted', 'converted', 'closed'], default: 'new' },
    source:   { type: String, default: 'contact_form' },
    notes:    { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
