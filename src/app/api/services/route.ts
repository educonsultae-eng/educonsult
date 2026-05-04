import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Service from '@/models/Service';
import { apiError, createSlug } from '@/lib/utils';
import { getUserFromRequest } from '@/lib/auth';
import { z } from 'zod';

const ServiceSchema = z.object({
  title:       z.string().min(3),
  excerpt:     z.string().min(10),
  description: z.string().min(20),
  icon:        z.string().optional(),
  image:       z.string().optional(),
  features:    z.array(z.string()).optional(),
  isActive:    z.boolean().optional(),
  order:       z.number().optional(),
});

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const onlyActive = searchParams.get('active') !== 'false';

  const query = onlyActive ? { isActive: true } : {};
  const services = await Service.find(query).sort({ order: 1, createdAt: -1 });
  return Response.json({ services });
}

export async function POST(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) return apiError('Unauthorized', 401);

  try {
    const body = await req.json();
    const parsed = ServiceSchema.safeParse(body);
    if (!parsed.success) return apiError(parsed.error.message, 400);

    await connectDB();
    const slug = createSlug(parsed.data.title);
    const service = await Service.create({ ...parsed.data, slug });
    return Response.json({ service }, { status: 201 });
  } catch (err: unknown) {
    if ((err as { code?: number }).code === 11000) return apiError('Service with this title already exists', 409);
    return apiError('Server error', 500);
  }
}
