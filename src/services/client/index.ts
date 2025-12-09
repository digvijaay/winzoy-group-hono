import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import {
  ClientCreateZ,
  ClientPutZ,
  ClientDeleteBodyZ,
  ObjectIdParam,
  PaginationQuery,
} from '../../validation/client.z';
import { ClientModel } from '../../models/Client';

export const clients = new Hono();

// List with basic pagination & fuzzy search on fullName / email
clients.get('/', zValidator('query', PaginationQuery), async (c) => {
  const { page, limit, q } = c.req.valid('query');

  const filter: Record<string, any> = {};
  if (q && q.trim()) {
    const regex = new RegExp(q.trim(), 'i');
    filter.$or = [{ fullName: regex }, { 'generalInformation.email': regex }];
  }

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    ClientModel.find(filter).skip(skip).limit(limit).lean(),
    ClientModel.countDocuments(filter),
  ]);

  return c.json({
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
    items,
  });
});

// Get by id
clients.get('/:id', zValidator('param', ObjectIdParam), async (c) => {
  const { id } = c.req.valid('param');
  const doc = await ClientModel.findById(id).lean();
  if (!doc) return c.json({ message: 'Client not found' }, 404);
  return c.json(doc);
});

// Create
clients.post('/', zValidator('json', ClientCreateZ), async (c) => {
  const payload = c.req.valid('json');
  const created = await ClientModel.create(payload);
  return c.json(created, 201);
});

// Replace (PUT) – requires full body per schema
clients.put(
  '/:id',
  zValidator('param', ObjectIdParam),
  zValidator('json', ClientPutZ),
  async (c) => {
    const { id } = c.req.valid('param');
    const payload = c.req.valid('json');

    const updated = await ClientModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
      overwrite: true, // full replace behavior for PUT
    }).lean();

    if (!updated) return c.json({ message: 'Client not found' }, 404);
    return c.json(updated);
  }
);

// Soft delete (requires DeletedBy body)
// This sets `deletedBy` field and keeps the record
clients.delete(
  '/:id',
  zValidator('param', ObjectIdParam),
  zValidator('json', ClientDeleteBodyZ),
  async (c) => {
    const { id } = c.req.valid('param');
    const deletedBy = c.req.valid('json');

    const updated = await ClientModel.findByIdAndUpdate(
      id,
      { deletedBy },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) return c.json({ message: 'Client not found' }, 404);
    return c.json({ message: 'Client soft-deleted', client: updated });
  }
);

export default clients;
