import { NextResponse } from 'next/server';

export async function middleware(req) {
    const { pathname } = req.nextUrl;

    const token = req.cookies.get('authToken')?.value; // Safely get token value

    // Fetch user session or data from an API only if token exists
    let isAuthenticated = false;
    if (token) {
        const response = await fetch(`${req.nextUrl.origin}/api/getAdmin`, { method: 'GET' });

        if (response.ok) {
            const data = await response.json();
            // Check if the token matches a valid user
            isAuthenticated = data.users.some(user => user._id === token);
        } else {
            console.error('Failed to fetch admin data');
        }
    }

    // Handle /admin route: Redirect to login if not authenticated
    if (pathname.startsWith('/admin')) {
        if (!isAuthenticated) {
            const loginUrl = new URL('/login', req.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Handle /login route: Redirect to dashboard if authenticated
    if (pathname === '/login') {
        if (isAuthenticated) {
            const dashboardUrl = new URL('/admin/dashboard', req.url);
            return NextResponse.redirect(dashboardUrl);
        }
    }

    return NextResponse.next(); // Allow the request if validation passes
}

// Define routes where the middleware should apply
export const config = {
    matcher: ['/admin/:path*', '/login'], // Apply to /admin and /login routes
};
