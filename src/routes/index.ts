import { Hono } from 'hono';
import authRouter from './auth';
import userRouter from './user';

const api = new Hono();

api.get('/', (c) => c.json({ message: 'Welcome to Winzoy API!' }));

api.route('/auth', authRouter);
api.route('/users', userRouter);

export default api;
