import { Hono } from 'hono';
import db from './config/db.js';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { prettyJSON } from 'hono/pretty-json';
import api from './routes/index.js';

const app = new Hono();

const welcomeStrings = [
  'Hello Hono!',
  'To learn more about Hono on Vercel, visit https://vercel.com/docs/frameworks/backend/hono',
];

// --- Middleware ---
app.use('*', logger());
app.use('*', cors());
app.use('*', prettyJSON());

(async () => {
  try {
    await db.connect();
  } catch (error) {
    console.error('Database connection failed', error);
  }
})();

app.basePath('/api/v1/').route('/', api);

app.get('/', (c) => {
  return c.text(welcomeStrings.join('\n\n'));
});

app.get('/health', (c) => c.text('OK'));

export default app;
