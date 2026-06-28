import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  if (!isAuthenticated()) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const file = path.join(process.cwd(), 'data', 'messages.json');
  try {
    const raw = await fs.readFile(file, 'utf-8');
    const messages = JSON.parse(raw);
    return NextResponse.json({ ok: true, messages });
  } catch {
    return NextResponse.json({ ok: true, messages: [] });
  }
}
