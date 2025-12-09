import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { registerSchema, loginSchema } from '../schemas/auth';
import { registerUser, loginUser } from '../services/auth';

const authRouter = new Hono();

// Register a new user
authRouter.post(
  '/register',

  zValidator('json', registerSchema, (result, c) => {
    if (!result.success) {
      return c.json(
        { error: 'Validation failed', issues: result.error.issues },
        400
      );
    }
  }),

  async (c) => {
    const userData = c.req.valid('json');
    const result = await registerUser(c, userData);

    if (!result.success) {
      return c.json({ message: result.message }, 400);
    }

    return c.json(
      {
        message: 'User registered successfully',
        user: result.data?.user,
        token: result.data?.token,
      },
      201
    );
  }
);

// Login a user
authRouter.post('/login', zValidator('json', loginSchema), async (c) => {
  const credentials = c.req.valid('json');
  const result = await loginUser(c, credentials);
  if (!result.success) {
    return c.json(
      { success: false, message: result.message },
      401 // Unauthorized
    );
  }
  return c.json(
    {
      success: true,
      message: result.message,
      token: result.data?.token,
      user: result.data?.user,
    },
    200
  );
});

// Add this line at the end
export default authRouter;
