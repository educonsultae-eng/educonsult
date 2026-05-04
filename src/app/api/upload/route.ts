import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Media from '@/models/Media';
import { uploadImage } from '@/lib/cloudinary';
import { apiError } from '@/lib/utils';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) return apiError('Unauthorized', 401);

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    if (!file) return apiError('No file provided', 400);

    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) return apiError('File too large (max 5MB)', 400);

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) return apiError('Invalid file type', 400);

    const buffer = Buffer.from(await file.arrayBuffer());
    const { url, publicId } = await uploadImage(buffer, 'edu-consultancy');

    await connectDB();
    const media = await Media.create({
      name:     file.name,
      url,
      publicId,
      type:     file.type,
      size:     file.size,
    });

    return Response.json({ url, publicId, media }, { status: 201 });
  } catch (err) {
    console.error('Upload error:', err);
    return apiError('Upload failed', 500);
  }
}

export async function GET(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) return apiError('Unauthorized', 401);

  await connectDB();
  const media = await Media.find().sort({ createdAt: -1 });
  return Response.json({ media });
}
