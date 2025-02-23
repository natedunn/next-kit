import { getSessionCookie } from 'better-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);
	if (!sessionCookie) {
		return NextResponse.redirect(new URL('/sign-in', request.url));
	}
	return NextResponse.next();
}

export const config = {
	// Apply middleware to specific routes
	matcher: [
		// For example:
		// "/dashboard"
	],
};
