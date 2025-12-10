import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth.js';
import { zValidator } from '@hono/zod-validator';
import { RoleInput, roleValidation } from '../validation/role.z.js';
import { servicesResponse, validatorResponse } from '../utils/hendler.js';
import { addNewUserRole } from '../_services/user-role/index.js';

const userRoleRouter = new Hono();

// All routes in this file are protected
userRoleRouter.use('/*', authMiddleware);

userRoleRouter.get('/', async (c) => {
  // const result = await getAllUsers();
});

userRoleRouter.post(
  '/',
  zValidator('json', roleValidation, validatorResponse),
  async (c) => {
    const role: RoleInput = c.req.valid('json');
    const result = await addNewUserRole(role);
    if ('error' in result) {
      return servicesResponse(c, result);
    }
    return servicesResponse(c, result);
  }
);
userRoleRouter.delete('/', async (c) => {
  // const result = await getAllUsers();
});

userRoleRouter.put('/', async (c) => {
  // const result = await getAllUsers();
});

export default userRoleRouter;
