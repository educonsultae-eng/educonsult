import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Settings from '@/models/Settings';
import { apiError } from '@/lib/utils';
import { getUserFromRequest } from '@/lib/auth';

export async function GET() {
  await connectDB();
  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create({});
  return Response.json({ settings });
}

export async function PUT(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) return apiError('Unauthorized', 401);

  await connectDB();
  const body = await req.json();
  let settings = await Settings.findOne();

  if (settings) {
    settings = await Settings.findByIdAndUpdate(settings._id, body, { new: true });
  } else {
    settings = await Settings.create(body);
  }

  return Response.json({ settings });
}
