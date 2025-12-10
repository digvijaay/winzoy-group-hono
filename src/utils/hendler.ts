import { Context } from 'hono';
import { ContentfulStatusCode } from 'hono/utils/http-status';

export type ServicesReturnType = {
  status: ContentfulStatusCode;
  message: string;
  body: any;
};

export const ServicesReturn = (
  status: ContentfulStatusCode,
  message: string,
  data: any
): ServicesReturnType => {
  return {
    status,
    message,
    body: data,
  };
};

export const servicesResponse = (c: Context, data: ServicesReturnType) => {
  return c.json(data, data.status);
};

//  if (!result.success) {
//       return c.json(
//         { error: 'Validation failed', issues: result.error.issues },
//         400
//       );
//     }

export const validatorResponse = (result: any, c: Context) => {
  if (!result.success) {
    const data: ServicesReturnType = {
      status: 400,
      message: 'Validation failed in request',
      body: {
        issues: result.error.issues,
      },
    };
    return c.json(data, data.status);
  }
};
