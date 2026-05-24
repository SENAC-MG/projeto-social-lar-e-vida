import { NextResponse } from 'next/server';
import { SESSION_COOKIE } from '@/features/auth/constants/auth-constants';
import { verifyJwtToken } from '@/features/auth/utils/jwt';

const PUBLIC_PATHS = ['/', '/recuperar-senha', '/redefinir-senha'];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/public')
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const isPublicPath = PUBLIC_PATHS.includes(pathname);

  const hasValidSession = token ? await verifyJwtToken(token) : null;

  if (!hasValidSession && !isPublicPath) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/';
    loginUrl.search = '';

    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete(SESSION_COOKIE);

    return response;
  }

  if (hasValidSession && pathname === '/') {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = '/home';
    homeUrl.search = '';

    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};