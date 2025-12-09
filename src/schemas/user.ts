import { object, string, regexes } from 'zod';

const userSchema = object({
  fullName: string().min(3, 'Username must be at least 3 characters long.'),
  email: string()
    .min(1, 'Email is required.')
    .regex(regexes.email, 'Invalid email address.'),
  password: string().min(6, 'Password must be at least 6 characters long.'),
});

export default userSchema;
