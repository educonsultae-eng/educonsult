import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import TeamMember from '@/models/TeamMember';
import { apiError } from '@/lib/utils';
import { getUserFromRequest } from '@/lib/auth';

export async function GET() {
  await connectDB();
  const team = await TeamMember.find({ isActive: true }).sort({ order: 1 });
  return Response.json({ team });
}

export async function POST(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) return apiError('Unauthorized', 401);

  await connectDB();
  const body = await req.json();
  const member = await TeamMember.create(body);
  return Response.json({ member }, { status: 201 });
}
