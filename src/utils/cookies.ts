import { setCookie, getCookie, deleteCookie } from 'hono/cookie';
import type { Context } from 'hono';

const isProd = process.env.NODE_ENV === 'production';
const domain = process.env.COOKIE_DOMAIN || undefined;

export function setAuthCookies(c: Context, access: string, refresh: string) {
  setCookie(c, 'access_token', access, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'Strict',
    path: '/',
    domain,
    maxAge: Number(process.env.JWT_EXPIRES_IN || 900),
  });

  setCookie(c, 'refresh_token', refresh, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'Strict',
    path: '/',
    domain,
    maxAge: Number(process.env.JWT_REFRESH_EXPIRES_IN || 604800),
  });
}

export function clearAuthCookies(c: Context) {
  deleteCookie(c, 'access_token');
  deleteCookie(c, 'refresh_token');
}

export function readAccessCookie(c: Context) {
  return getCookie(c, 'access_token');
}

export function readRefreshCookie(c: Context) {
  return getCookie(c, 'refresh_token');
}
