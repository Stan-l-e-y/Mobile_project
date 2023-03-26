import { object, TypeOf, z, string } from 'zod';

export const createUserSchema = object({
  firstName: string({
    required_error: 'First name is required',
  }).min(3, 'First name must be at least 3 characters'),
  email: z.string().min(1, { message: 'Email is required' }),
  password: string({
    required_error: 'Password is required',
  }).min(6, 'Password must be at least 6 characters'),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;

export const createSessionSchema = object({
  email: z.string().min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export type CreateSessionInput = TypeOf<typeof createSessionSchema>;
