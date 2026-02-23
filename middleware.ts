import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const { pathname } = req.nextUrl;

        // Role-based routing
        if (pathname.startsWith('/student') && token?.role !== 'student' && token?.role !== 'admin') {
            return NextResponse.redirect(new URL('/login?error=unauthorized', req.url));
        }
        if (pathname.startsWith('/mentor') && token?.role !== 'mentor' && token?.role !== 'admin') {
            return NextResponse.redirect(new URL('/login?error=unauthorized', req.url));
        }
        if (pathname.startsWith('/admin') && token?.role !== 'admin') {
            return NextResponse.redirect(new URL('/login?error=unauthorized', req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const { pathname } = req.nextUrl;
                if (pathname.startsWith('/student') || pathname.startsWith('/mentor') || pathname.startsWith('/admin')) {
                    return !!token;
                }
                return true;
            },
        },
    },
);

export const config = {
    matcher: ['/student/:path*', '/mentor/:path*', '/admin/:path*'],
};
