import mongoose, { Schema, Document } from 'mongoose';

export interface ITeamMember extends Document {
  name: string;
  role: string;
  bio: string;
  image?: string;
  email?: string;
  linkedin?: string;
  order: number;
  isActive: boolean;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name:     { type: String, required: true, trim: true },
    role:     { type: String, required: true },
    bio:      { type: String, required: true },
    image:    { type: String },
    email:    { type: String },
    linkedin: { type: String },
    order:    { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.TeamMember || mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema);
