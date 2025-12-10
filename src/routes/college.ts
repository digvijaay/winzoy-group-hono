// src/routes/college.ts
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { authMiddleware } from '../middleware/auth.js';
import { servicesResponse, validatorResponse } from '../utils/hendler.js';
import {
  collegeCreateValidation,
  collegePutValidation,
  objectIdParamValidation,
} from '../validation/college.z.js';
import {
  addNewCollege,
  deleteCollege,
  getAllColleges,
  updateCollege,
} from '../_services/college/index.js';

const collegeRouter = new Hono();

// protect all routes
collegeRouter.use('/*', authMiddleware);

// GET /college/  -> list all
collegeRouter.get('/', async (c) => {
  const result = await getAllColleges();
  return servicesResponse(c, result);
});

// POST /college/ -> create
collegeRouter.post(
  '/',
  zValidator('json', collegeCreateValidation, validatorResponse),
  async (c) => {
    const payload = c.req.valid('json');
    const result = await addNewCollege(payload);
    return servicesResponse(c, result);
  }
);

// PUT /college/:id -> update
collegeRouter.put(
  '/:id',
  zValidator('param', objectIdParamValidation, validatorResponse),
  zValidator('json', collegePutValidation, validatorResponse),
  async (c) => {
    const { id } = c.req.valid('param');
    const updateData = c.req.valid('json');
    const result = await updateCollege(id, updateData);
    return servicesResponse(c, result);
  }
);

// DELETE /college/:id -> delete
collegeRouter.delete(
  '/:id',
  zValidator('param', objectIdParamValidation, validatorResponse),
  async (c) => {
    const { id } = c.req.valid('param');
    const result = await deleteCollege(id);
    return servicesResponse(c, result);
  }
);

export default collegeRouter;
