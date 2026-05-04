import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import BlogPost from '@/models/BlogPost';
import { apiError, createSlug } from '@/lib/utils';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectDB();
  const post = await BlogPost.findOne({ slug });
  if (!post) return apiError('Blog post not found', 404);
  return Response.json({ post });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const user = getUserFromRequest(req);
  if (!user) return apiError('Unauthorized', 401);

  const { slug } = await params;
  await connectDB();
  const body = await req.json();
  if (body.title) body.slug = createSlug(body.title);

  const post = await BlogPost.findOneAndUpdate({ slug }, body, { new: true });
  if (!post) return apiError('Blog post not found', 404);
  return Response.json({ post });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const user = getUserFromRequest(req);
  if (!user) return apiError('Unauthorized', 401);

  const { slug } = await params;
  await connectDB();
  await BlogPost.findOneAndDelete({ slug });
  return Response.json({ message: 'Deleted successfully' });
}
