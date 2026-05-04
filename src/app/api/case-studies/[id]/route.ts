import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import CaseStudy from '@/models/CaseStudy';
import { apiError, createSlug } from '@/lib/utils';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const study = await CaseStudy.findOne({ $or: [{ _id: id }, { slug: id }] });
  if (!study) return apiError('Case study not found', 404);
  return Response.json({ study });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = getUserFromRequest(req);
  if (!user) return apiError('Unauthorized', 401);

  const { id } = await params;
  await connectDB();
  const body = await req.json();
  if (body.title) body.slug = createSlug(body.title);

  const study = await CaseStudy.findByIdAndUpdate(id, body, { new: true });
  if (!study) return apiError('Case study not found', 404);
  return Response.json({ study });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = getUserFromRequest(req);
  if (!user) return apiError('Unauthorized', 401);

  const { id } = await params;
  await connectDB();
  await CaseStudy.findByIdAndDelete(id);
  return Response.json({ message: 'Deleted successfully' });
}
