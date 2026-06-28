import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * Stores contact submissions to data/messages.json. On a stateful host these
 * persist and can be reviewed from the dashboard. Swap in an email/CRM provider
 * by replacing the storage block below.
 */
export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const message = String(body.message || '').trim();

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
  }

  const dataDir = path.join(process.cwd(), 'data');
  const file = path.join(dataDir, 'messages.json');
  try {
    await fs.mkdir(dataDir, { recursive: true });
    let existing: unknown[] = [];
    try {
      existing = JSON.parse(await fs.readFile(file, 'utf-8'));
    } catch {
      existing = [];
    }
    existing.push({ name, email, message, at: new Date().toISOString() });
    await fs.writeFile(file, JSON.stringify(existing, null, 2), 'utf-8');
  } catch {
    // Storage is best-effort; still acknowledge so the visitor isn't blocked.
  }

  return NextResponse.json({ ok: true });
}
