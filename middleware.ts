import { NextResponse, type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { guestRegex, isDevelopmentEnvironment } from './lib/constants';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /*
   * Playwright starts the dev server and requires a 200 status to
   * begin the tests, so this ensures that the tests can start
   */
  if (pathname.startsWith('/ping')) {
    return new Response('pong', { status: 200 });
  }

  // Allow all API routes except auth routes to pass through
  if (pathname.startsWith('/api/')) {
    if (pathname.startsWith('/api/auth')) {
      return NextResponse.next();
    }
    // For other API routes, we still need to check authentication
    // but we'll handle this after the token check
  }

  // Allow access to public pages without authentication
  const publicPages = ['/landing', '/about', '/contact', '/demo', '/features', '/pricing', '/privacy', '/security', '/terms'];
  if (publicPages.includes(pathname)) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: !isDevelopmentEnvironment,
  });

  // Handle API routes that require authentication
  if (pathname.startsWith('/api/') && !token) {
    return new Response('Unauthorized', { status: 401 });
  }

  const isGuest = guestRegex.test(token?.email ?? '');

  // Redirect unauthenticated users OR guests to landing page for protected routes
  if (!token || isGuest) {
    // Check if trying to access root or chat routes
    if (pathname === '/' || pathname.startsWith('/chat')) {
      return NextResponse.redirect(new URL('/landing', request.url));
    }
    
    // For other protected routes, redirect to guest auth (existing behavior for non-guests)
    if (!isGuest) {
      const redirectUrl = encodeURIComponent(request.url);
      return NextResponse.redirect(
        new URL(`/api/auth/guest?redirectUrl=${redirectUrl}`, request.url),
      );
    }
  }

  // Redirect authenticated non-guest users away from auth pages
  if (token && !isGuest && ['/login', '/register', '/landing'].includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
