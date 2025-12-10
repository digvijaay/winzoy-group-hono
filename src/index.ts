import { Hono } from 'hono';
import db from './config/db.js';

const app = new Hono();

const welcomeStrings = [
  'Hello Hono!',
  'To learn more about Hono on Vercel, visit https://vercel.com/docs/frameworks/backend/hono',
];

(async () => {
  try {
    await db.connect();
  } catch (error) {
    console.error('Database connection failed', error);
  }
})();

app.get('/', (c) => {
  return c.text(welcomeStrings.join('\n\n'));
});

export default app;
