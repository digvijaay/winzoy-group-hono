import { serve } from '@hono/node-server';
import db from './config/db.js';
import app from './index.js';

const port = parseInt(process.env.PORT || '3000', 10);

// Connect to the database

// console.log(`Server is running on port ${port}`);

// Bun.serve({ fetch: app.fetch, port: Number(port) });

async function start() {
  serve({
    fetch: app.fetch,
    port,
  });
  await db.connect();
  console.log(`Server running on http://localhost:${port}`);
}

start();
