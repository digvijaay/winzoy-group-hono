import RoleModel from '../../models/Role.js';
import { ServicesReturn, ServicesReturnType } from '../../utils/hendler.js';
import { RoleInput } from '../../validation/role.z.js';

export const addNewUserRole = async (
  client: RoleInput
): Promise<ServicesReturnType> => {
  try {
    // Save client to database
    const newClient = await RoleModel.create(client);
    return ServicesReturn(201, 'Client created successfully', newClient);
  } catch (err: any) {
    console.error('Error creating client:', err);

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e: any) => e.message);
      return ServicesReturn(400, 'Validation error', errors);
    }

    // Handle duplicate key errors
    if (err.code && err.code === 11000) {
      return ServicesReturn(409, 'Duplicate entry error', err.keyValue);
    }

    // Fallback for unknown errors
    return ServicesReturn(500, 'Internal server error', err.message || err);
  }
};
