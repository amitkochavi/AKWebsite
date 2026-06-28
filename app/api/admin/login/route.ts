import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, createSessionToken, setSessionCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  let password = '';
  try {
    const body = await request.json();
    password = String(body.password || '');
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!verifyPassword(password)) {
    return NextResponse.json({ ok: false, error: 'Invalid password' }, { status: 401 });
  }

  setSessionCookie(createSessionToken());
  return NextResponse.json({ ok: true });
}
