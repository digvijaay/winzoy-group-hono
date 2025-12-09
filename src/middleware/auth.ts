import type { Context, Next } from 'hono';
import { readAccessCookie } from '../utils/cookies';
import { verifyAccessToken } from '../utils/jwt';

export async function authMiddleware(c: Context, next: Next) {
  const token = readAccessCookie(c);
  if (!token) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const payload = await verifyAccessToken(token);
    if (payload.type !== 'access')
      return c.json({ error: 'Invalid token type' }, 401);

    c.set('user', payload);
    await next();
  } catch {
    return c.json({ error: 'Invalid or expired token' }, 401);
  }
}
