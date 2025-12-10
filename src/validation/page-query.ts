import { coerce, object, string } from 'zod';

export const paginationQueryValidation = object({
  page: coerce.number().int().positive().default(1),
  limit: coerce.number().int().positive().max(100).default(20),
  q: string().trim().optional(),
});
