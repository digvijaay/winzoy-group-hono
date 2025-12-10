import ClientModel from '../../models/Client/index.js';
import { IClientCreate } from '../../models/Client/types.js';
import { ServicesReturn, ServicesReturnType } from '../../utils/hendler.js';

export const addNewClient = async (
  client: IClientCreate
): Promise<ServicesReturnType> => {
  try {
    const existingClient = await ClientModel.findOne({
      'generalInformation.phone': client.generalInformation.phone,
    });

    if (existingClient) {
      return ServicesReturn(
        409,
        'Entry already exists',
        `Phone ${client.generalInformation.phone} is already registered`
      );
    }

    // Save client to database
    const newClient = await ClientModel.create(client);

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
