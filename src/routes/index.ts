// src/routes/index.tsx

import { Hono } from 'hono';
import authRouter from './auth.js';
import userRouter from './user.js';
import clientRouter from './client.js';
import userRoleRouter from './role.js';
import collegeRouter from './college.js';

const api = new Hono();

api.get('/', (c) => c.json({ message: 'Welcome to Winzoy API!' }));

api.route('/auth', authRouter);
api.route('/users', userRouter);
api.route('/client', clientRouter);
api.route('/user-roles', userRoleRouter);
api.route('/college', collegeRouter);

export default api;
