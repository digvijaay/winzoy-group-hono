import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth';
import { getAllUsers, getUserById } from '../services/user';

const userRouter = new Hono();

// All routes in this file are protected
userRouter.use('/*', authMiddleware);

// GET /api/users - Get all users
userRouter.get('/', async (c) => {
  const result = await getAllUsers();

  if ('error' in result) {
    return c.json({ error: result.error, message: result.message });
  }

  return c.json({ users: result.users }, 200);
});

// GET /api/users/profile - Get the logged-in user's profile
// userRouter.get('/profile', async (c) => {
//   // Explicitly cast the user object to the IUser type
//   const user = c.get('user') as IUser;
//   const result = await getProfile(user.id);

//   if ('error' in result) {
//     return c.json({ error: result.error, message: result.message });
//   }

//   return c.json({ user: result.user }, 200);
// });

// GET /api/users/:id - Get a specific user by their ID
userRouter.get('/:id', async (c) => {
  // Correctly get the 'id' from the URL parameter
  const { id } = c.req.param();
  // Use the correct service function to get the user by that ID
  const result = await getUserById(id);

  if ('error' in result) {
    return c.json({ error: result.error, message: result.message });
  }

  return c.json({ user: result.user }, 200);
});

// This line makes the router available for import in other files
export default userRouter;
