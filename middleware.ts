import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * @file middleware.ts
 * @description Next.js Server-Side Security Middleware
 * 
 * What it does:
 * 1. Intercepts all incoming requests to routes starting with `/admin`.
 * 2. Checks for the presence of the secure Appwrite authentication session cookie.
 * 3. Instantly redirects unauthenticated users (guests / Incognito visitors) back to 
 *    the homepage (`/`) at the server level before any page code loads.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all routes starting with /admin
  if (pathname.startsWith('/admin')) {
    // Appwrite session cookie name format: a_session_{PROJECT_ID}
    const sessionCookie = request.cookies.get('a_session_6acccd7500222ca47334');

    // If no session cookie exists, redirect immediately to home
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};