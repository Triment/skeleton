import { NextResponse } from 'next/server';
import type { NextRequest, NextFetchEvent } from 'next/server';
import { host } from './config';

function getUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  // Setting cookies on the response
  const response = NextResponse.next();

  // const user_uuid = request.cookies.get('user_uuid')
  // if (!user_uuid) {
  //   response.cookies.set('user_uuid', getUuid(), {
  //     maxAge: 1000 * 60 * 60 * 24 * 20000
  //   })
  // }
  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
};
