import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export const middleware = async (req, res) => {
    // JWT token will exist if the user is logged in
    const token = await getToken({
        req,
        secret: process.env.JWT_SECRET,
        secureCookie:
            process.env.NEXTAUTH_URL?.startsWith('https://') ??
            !!process.env.VERCEL_URL,
    });

    const { pathname } = req.nextUrl;

    // JWT token exists or request is made to auth API
    if (token || pathname.includes('/api/auth')) {
        return NextResponse.next();
    }

    // JWT token does not exist and request is made to a guarded route
    if (!token && pathname !== '/login') {
        return NextResponse.redirect('/login');
    }
};
