import CollegeModel from '../../models/College/index.js';
import { ServicesReturn } from '../../utils/hendler.js';
import { ICollege } from '../../models/College/types.js';

export const addNewCollege = async (
  payload: ICollege
): Promise<ServicesReturnType> => {
  try {
    const doc = await CollegeModel.create(payload);

    return ServicesReturn(201, 'College created successfully', doc);
  } catch (err: any) {
    // Handle duplicate key or validation errors if needed
    return ServicesReturn(500, 'Failed to create college', {
      error: 'DB_ERROR',
      message: err?.message || 'Failed to create college',
    });
  }
};
