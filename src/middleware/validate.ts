import { zValidator } from '@hono/zod-validator';
import type { z } from 'zod';

// This is a conceptual file. The actual validation is done
// directly in the routes using zValidator from @hono/zod-validator.
// This file serves as a placeholder to explain the concept.

/**
 * Creates a validation middleware using Zod.
 * @param schema The Zod schema to validate against.
 * @returns Hono middleware for validation.
 *
 * @example
 * import { registerSchema } from '../schemas/authSchema';
 * app.post('/register', validate(registerSchema), (c) => { ... });
 */
export const validate = (schema: z.ZodSchema) => {
  return zValidator('json', schema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          error: 'Validation failed',
          issues: result.error.issues,
        },
        400
      );
    }
  });
};
