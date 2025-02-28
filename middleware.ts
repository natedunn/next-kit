import type { NextRequest } from 'next/server';

import { getSessionCookie } from 'better-auth';
import { NextResponse } from 'next/server';

const authGuardUrls = ['/admin', '/authed'];

export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);
	if (!sessionCookie && authGuardUrls.includes(request.nextUrl.pathname)) {
		return NextResponse.redirect(
			new URL(`/sign-in?redirectTo=${request.nextUrl.pathname}`, request.url)
		);
	}
	return NextResponse.next();
}

export const config = {
	// Apply middleware to specific routes
	matcher: [
		'/((?!api/|_next/|_static/|_vercel|favicon.ico|[\\w-]+\\.\\w+).*)',
		'/admin',
		'/authed',
	],
};
