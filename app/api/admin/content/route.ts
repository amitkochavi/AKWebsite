import { NextRequest, NextResponse } from 'next/server';
import { getContent, saveContent, resetContent } from '@/lib/content';
import { isAuthenticated } from '@/lib/auth';
import { isLocale } from '@/lib/i18n';
import type { SiteContent } from '@/lib/types';

export async function GET(request: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const locale = request.nextUrl.searchParams.get('locale') || 'en';
  if (!isLocale(locale)) {
    return NextResponse.json({ ok: false, error: 'Bad locale' }, { status: 400 });
  }
  const content = await getContent(locale);
  return NextResponse.json({ ok: true, content });
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  let body: { locale?: string; content?: SiteContent };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }
  const locale = body.locale || '';
  if (!isLocale(locale) || !body.content) {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 });
  }
  await saveContent(locale, body.content);
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const locale = request.nextUrl.searchParams.get('locale') || 'en';
  if (!isLocale(locale)) {
    return NextResponse.json({ ok: false, error: 'Bad locale' }, { status: 400 });
  }
  await resetContent(locale);
  const content = await getContent(locale);
  return NextResponse.json({ ok: true, content });
}
