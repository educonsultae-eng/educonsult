import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import TeamMember from '@/models/TeamMember';
import { apiError } from '@/lib/utils';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const member = await TeamMember.findById(id);
  if (!member) return apiError('Team member not found', 404);
  return Response.json({ member });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = getUserFromRequest(req);
  if (!user) return apiError('Unauthorized', 401);

  const { id } = await params;
  await connectDB();
  const body = await req.json();
  const member = await TeamMember.findByIdAndUpdate(id, body, { new: true });
  if (!member) return apiError('Team member not found', 404);
  return Response.json({ member });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = getUserFromRequest(req);
  if (!user) return apiError('Unauthorized', 401);

  const { id } = await params;
  await connectDB();
  await TeamMember.findByIdAndDelete(id);
  return Response.json({ message: 'Deleted successfully' });
}
