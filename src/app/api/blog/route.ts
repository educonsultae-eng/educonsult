import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import BlogPost from '@/models/BlogPost';
import { apiError, createSlug } from '@/lib/utils';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const tag = searchParams.get('tag');
  const all = searchParams.get('all') === 'true';

  const query: Record<string, unknown> = all ? {} : { isPublished: true };
  if (tag) query.tags = tag;

  const posts = await BlogPost.find(query).sort({ publishedAt: -1, createdAt: -1 });
  return Response.json({ posts });
}

export async function POST(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) return apiError('Unauthorized', 401);

  await connectDB();
  const body = await req.json();
  const slug = createSlug(body.title);

  try {
    const post = await BlogPost.create({ ...body, slug });
    return Response.json({ post }, { status: 201 });
  } catch (err: unknown) {
    if ((err as { code?: number }).code === 11000) return apiError('A post with this title already exists', 409);
    return apiError('Server error', 500);
  }
}
