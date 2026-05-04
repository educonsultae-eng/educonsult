import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import CaseStudy from '@/models/CaseStudy';
import { apiError, createSlug } from '@/lib/utils';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const all = searchParams.get('all') === 'true';
  const query = all ? {} : { isPublished: true };
  const studies = await CaseStudy.find(query).sort({ createdAt: -1 });
  return Response.json({ studies });
}

export async function POST(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) return apiError('Unauthorized', 401);

  await connectDB();
  const body = await req.json();
  const slug = createSlug(body.title);

  try {
    const study = await CaseStudy.create({ ...body, slug });
    return Response.json({ study }, { status: 201 });
  } catch {
    return apiError('Server error', 500);
  }
}
