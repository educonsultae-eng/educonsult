import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Service from '@/models/Service';
import { apiError, createSlug } from '@/lib/utils';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const service = await Service.findOne({ $or: [{ _id: id }, { slug: id }] });
  if (!service) return apiError('Service not found', 404);
  return Response.json({ service });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = getUserFromRequest(req);
  if (!user) return apiError('Unauthorized', 401);

  const { id } = await params;
  await connectDB();
  const body = await req.json();
  if (body.title) body.slug = createSlug(body.title);

  const service = await Service.findByIdAndUpdate(id, body, { new: true, runValidators: true });
  if (!service) return apiError('Service not found', 404);
  return Response.json({ service });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = getUserFromRequest(req);
  if (!user) return apiError('Unauthorized', 401);

  const { id } = await params;
  await connectDB();
  const service = await Service.findByIdAndDelete(id);
  if (!service) return apiError('Service not found', 404);
  return Response.json({ message: 'Deleted successfully' });
}
