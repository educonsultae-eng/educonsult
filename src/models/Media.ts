import mongoose, { Schema, Document } from 'mongoose';

export interface IMedia extends Document {
  name: string;
  url: string;
  publicId: string;
  type: string;
  size: number;
}

const MediaSchema = new Schema<IMedia>(
  {
    name:     { type: String, required: true },
    url:      { type: String, required: true },
    publicId: { type: String, required: true },
    type:     { type: String, required: true },
    size:     { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Media || mongoose.model<IMedia>('Media', MediaSchema);
