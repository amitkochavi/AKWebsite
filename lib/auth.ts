import 'server-only';
import crypto from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'ak_admin';
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

function getSecret(): string {
  return process.env.ADMIN_SECRET || 'dev-insecure-secret-change-me';
}

function getPassword(): string {
  return process.env.ADMIN_PASSWORD || 'changeme';
}

function sign(value: string): string {
  return crypto.createHmac('sha256', getSecret()).update(value).digest('hex');
}

export function verifyPassword(password: string): boolean {
  const expected = getPassword();
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function createSessionToken(): string {
  const expires = Date.now() + SESSION_TTL_MS;
  const payload = `${expires}`;
  return `${payload}.${sign(payload)}`;
}

export function isValidSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;
  if (sign(payload) !== signature) return false;
  const expires = Number(payload);
  return Number.isFinite(expires) && expires > Date.now();
}

export function setSessionCookie(token: string): void {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export function clearSessionCookie(): void {
  cookies().delete(COOKIE_NAME);
}

export function isAuthenticated(): boolean {
  const token = cookies().get(COOKIE_NAME)?.value;
  return isValidSessionToken(token);
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
