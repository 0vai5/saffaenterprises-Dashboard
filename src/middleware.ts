import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login';
    const token = request.cookies.get('token')?.value || '';

    console.log(`Path: ${path}`);
    console.log(`Is Public Path: ${isPublicPath}`);
    console.log(`Token: ${token}`);

    if (isPublicPath && token) {
        console.log('Redirecting to home page because user is already authenticated.');
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (!isPublicPath && !token) {
        console.log('Redirecting to login page because user is not authenticated.');
        return NextResponse.redirect(new URL('/login', request.url));
    }

    console.log('No redirection necessary. Proceeding with the request.');
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/login',
        '/users',
        '/invoice',
        '/createInvoice',
        '/edit-invoice',
        '/search',
    ],
};
