import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    console.log("Run ")
    const pathname = request.nextUrl.pathname;
    
    const publicRoutes = ['/login', '/register'];
    
    const protectedRoutes = ['/dashboard', '/accounts', '/aggreements', '/business-industries', '/business-managements', '/infomation'];
    
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    
    // const token = request.cookies.get('accessToken')?.value;
    
    // if (isProtectedRoute && !token) {
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }
    
    // if (token && publicRoutes.some(route => pathname.startsWith(route))) {
    //     return NextResponse.redirect(new URL('/dashboard', request.url));
    // }
    
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
