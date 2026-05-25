import { NextRequest, NextResponse } from 'next/server';

const canonicalHost = 'www.zephyradynamics.com';
const redirectHosts = new Set([
  'website-ten-murex-89.vercel.app',
  'zephyradynamics.com',
]);

export function proxy(request: NextRequest) {
  const host = request.headers.get('host')?.toLowerCase();

  if (host && redirectHosts.has(host)) {
    const url = request.nextUrl.clone();
    url.protocol = 'https';
    url.host = canonicalHost;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|logo.ico).*)'],
};
