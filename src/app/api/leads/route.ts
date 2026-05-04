import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Lead from '@/models/Lead';
import { apiError } from '@/lib/utils';
import { getUserFromRequest } from '@/lib/auth';
import { z } from 'zod';

const LeadSchema = z.object({
  name:     z.string().min(2).max(100),
  email:    z.string().email(),
  phone:    z.string().optional(),
  school:   z.string().optional(),
  position: z.string().optional(),
  message:  z.string().min(10).max(2000),
});

export async function GET(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) return apiError('Unauthorized', 401);

  await connectDB();
  const leads = await Lead.find().sort({ createdAt: -1 });
  return Response.json({ leads });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = LeadSchema.safeParse(body);
    if (!parsed.success) return apiError(parsed.error.errors[0].message, 400);

    await connectDB();
    const lead = await Lead.create({ ...parsed.data, source: 'contact_form' });
    return Response.json({ message: 'Thank you! We will be in touch shortly.', lead }, { status: 201 });
  } catch {
    return apiError('Server error', 500);
  }
}
