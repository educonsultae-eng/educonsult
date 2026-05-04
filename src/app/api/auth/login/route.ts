import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { signToken } from '@/lib/auth';
import { apiError } from '@/lib/utils';
import { z } from 'zod';

const LoginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) return apiError('Invalid credentials', 400);

    await connectDB();
    const user = await User.findOne({ email: parsed.data.email, isActive: true });
    if (!user) return apiError('Invalid email or password', 401);

    const valid = await user.comparePassword(parsed.data.password);
    if (!valid) return apiError('Invalid email or password', 401);

    const token = signToken({ userId: user._id.toString(), email: user.email, role: user.role });

    const response = Response.json({
      message: 'Login successful',
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });

    (response.headers as Headers).set(
      'Set-Cookie',
      `auth_token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Lax`
    );

    return response;
  } catch (err) {
    console.error('Login error:', err);
    return apiError('Server error', 500);
  }
}
