import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Lead from '@/models/Lead';
import { apiError } from '@/lib/utils';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = getUserFromRequest(req);
  if (!user) return apiError('Unauthorized', 401);

  const { id } = await params;
  await connectDB();
  const lead = await Lead.findById(id);
  if (!lead) return apiError('Lead not found', 404);
  return Response.json({ lead });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = getUserFromRequest(req);
  if (!user) return apiError('Unauthorized', 401);

  const { id } = await params;
  await connectDB();
  const body = await req.json();
  const lead = await Lead.findByIdAndUpdate(id, body, { new: true });
  if (!lead) return apiError('Lead not found', 404);
  return Response.json({ lead });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = getUserFromRequest(req);
  if (!user) return apiError('Unauthorized', 401);

  const { id } = await params;
  await connectDB();
  await Lead.findByIdAndDelete(id);
  return Response.json({ message: 'Deleted successfully' });
}
