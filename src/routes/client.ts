// src/routes/client.tsx

import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth.js';
import { getAllClients } from '../_services/client/get.js';
import { clientPageName } from '../utils/enum.js';
import {
  addNewClient,
  deleteClient,
  transferClient,
  updateClient,
} from '../_services/client/index.js';
import { servicesResponse, validatorResponse } from '../utils/hendler.js';
import {
  clientCreateValidation,
  clientDeleteBodyValidation,
  clientPutValidation,
  objectIdParamValidation,
} from '../validation/client.z.js';
import { zValidator } from '@hono/zod-validator';
import { IClientCreate } from '../models/Client/types.js';

const clientRouter = new Hono();

// All routes in this file are protected
clientRouter.use('/*', authMiddleware);

// get all by page name
clientRouter.get('/:page_name', async (c) => {
  const page_name = c.req.param('page_name');
  const result = await getAllClients(page_name);
  if ('error' in result) {
    return c.json({ error: result.error, message: result.body.message });
  }
  return c.json({ ...result }, 200);
});

clientRouter.post(
  `/${clientPageName[0]}`,
  zValidator('json', clientCreateValidation, validatorResponse),
  async (c) => {
    const client: IClientCreate = c.req.valid('json');
    const result = await addNewClient(client);
    if ('error' in result) {
      return servicesResponse(c, result);
    }

    return servicesResponse(c, result);
  }
);

clientRouter.put(
  '/:id',
  zValidator('param', objectIdParamValidation, validatorResponse),
  zValidator('json', clientPutValidation, validatorResponse),
  async (c) => {
    const { id } = c.req.valid('param');
    const updateData = await c.req.json();
    const result = await updateClient(id, updateData);
    return c.json(result.body, result.status);
  }
);

clientRouter.delete(
  '/:id',
  zValidator('param', objectIdParamValidation),
  zValidator('query', clientDeleteBodyValidation.partial()),
  async (c) => {
    const { id } = c.req.valid('param');
    const { reason } = c.req.valid('query');
    const result = await deleteClient(c, id, reason);
    return servicesResponse(c, result);
  }
);

clientRouter.patch(
  '/:id/:page_name',
  authMiddleware,
  zValidator('param', objectIdParamValidation),
  async (c) => {
    const { id } = c.req.valid('param');
    const page_name = c.req.param('page_name');

    // Manual validation for page_name
    if (!clientPageName.includes(page_name as any)) {
      return c.json(
        {
          error: 'Invalid page name',
          message: `Page name must be one of: ${clientPageName.join(', ')}`,
        },
        400
      );
    }

    const result = await transferClient(id, page_name);
    return c.json(result.body, result.status);
  }
);

export default clientRouter;
