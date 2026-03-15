// middleware.js
import { NextResponse } from 'next/server';

export const config = {
  // Only run middleware on API requests, skip static assets and WebSockets 
  // (WebSockets are handled client-side by useWebSocket.js)
  matcher: ['/api/:path*'],
};

export function middleware(req) {
  // Read backend URLs from Vercel Environment Variables
  const BACKEND_US = process.env.VITE_API_US || process.env.VITE_API_URL;
  const BACKEND_EU = process.env.VITE_API_EU;

  // If multisite is not configured, fallback to standard VITE_API_URL behavior
  if (!BACKEND_US) {
    return NextResponse.next();
  }

  // Get user's country from Vercel's GeoIP header, default to US
  const countryCode = req.geo?.country || 'US';
  
  // Define European & nearby countries for EU routing
  const euCountries = new Set([
     'GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'SE', 'CH', 'AT', 'NO', 'DK', 'FI', 'IE', 'PT', 'GR', 'PL', 'RO', 'CZ', 'HU', 'UA', 'ZA', 'EG', 'MA', 'NG', 'KE'
  ]);
  
  const isEuropeOrAfrica = euCountries.has(countryCode);

  // Select target backend based on geography. If EU backend is missing, fallback to US.
  const targetBackend = (isEuropeOrAfrica && BACKEND_EU) ? BACKEND_EU : BACKEND_US;

  // Rewrite URL to proxy the request to the target Render instance
  const url = req.nextUrl.clone();
  try {
    const targetUrl = new URL(targetBackend);
    url.hostname = targetUrl.hostname;
    url.port = targetUrl.port || (targetUrl.protocol === 'https:' ? '443' : '80');
    url.protocol = targetUrl.protocol;
  } catch (e) {
    console.error("Invalid backend URL configuration", e);
    return NextResponse.next();
  }

  // Add tracking headers
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-routed-region', isEuropeOrAfrica ? 'EU' : 'US');
  requestHeaders.set('x-frontend-edge-geo', countryCode);
  
  return NextResponse.rewrite(url, {
    request: {
      headers: requestHeaders,
    },
  });
}
