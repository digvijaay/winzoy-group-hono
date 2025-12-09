import { Hono } from 'hono';

const clientRouter = new Hono();

clientRouter.get('/:page_name', async (c) => {
  const page_name = c.req.param('page_name');
});

export default clientRouter;
