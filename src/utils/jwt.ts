import { sign, verify } from 'hono/jwt';

const ACCESS_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

const ACCESS_EXPIRES_IN = Number(process.env.JWT_EXPIRES_IN || 900); // 15m
const REFRESH_EXPIRES_IN = Number(process.env.JWT_REFRESH_EXPIRES_IN || 604800); // 7d

export async function signAccessToken(payload: object) {
  return await sign(
    {
      ...payload,
      type: 'access',
      exp: Math.floor(Date.now() / 1000) + ACCESS_EXPIRES_IN,
    },
    ACCESS_SECRET
  );
}

export async function signRefreshToken(payload: object) {
  return await sign(
    {
      ...payload,
      type: 'refresh',
      exp: Math.floor(Date.now() / 1000) + REFRESH_EXPIRES_IN,
    },
    REFRESH_SECRET
  );
}

export async function verifyAccessToken(token: string) {
  return await verify(token, ACCESS_SECRET);
}

export async function verifyRefreshToken(token: string) {
  return await verify(token, REFRESH_SECRET);
}
