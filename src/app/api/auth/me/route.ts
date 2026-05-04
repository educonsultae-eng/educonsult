import { NextRequest } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { apiError } from '@/lib/utils';

export async function GET(req: NextRequest) {
  const payload = getUserFromRequest(req);
  if (!payload) return apiError('Unauthorized', 401);

  await connectDB();
  const user = await User.findById(payload.userId).select('-password');
  if (!user) return apiError('User not found', 404);

  return Response.json({ user });
}
