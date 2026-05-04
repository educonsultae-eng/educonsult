import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';

const PROTECTED_ADMIN_PATHS = [
  '/admin/dashboard',
  '/admin/services',
  '/admin/team',
  '/admin/blog',
  '/admin/leads',
  '/admin/media',
  '/admin/settings',
  '/admin/case-studies',
];

const PROTECTED_API_PATHS = [
  '/api/services',
  '/api/team',
  '/api/blog',
  '/api/leads',
  '/api/settings',
  '/api/upload',
  '/api/case-studies',
  '/api/media',
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedAdmin = PROTECTED_ADMIN_PATHS.some((p) => pathname.startsWith(p));
  const isProtectedAPI   = PROTECTED_API_PATHS.some((p) => pathname.startsWith(p));

  if (isProtectedAdmin) {
    const token = request.cookies.get('auth_token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  if (isProtectedAPI && request.method !== 'GET') {
    const user = (() => {
      const token = getTokenFromRequest(request);
      return token ? verifyToken(token) : null;
    })();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
