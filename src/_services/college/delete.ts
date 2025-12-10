import CollegeModel from '../../models/College/index.js';
import { ICollege } from '../../models/College/types.js';
import { ServicesReturn } from '../../utils/hendler.js';
import { Types } from 'mongoose';

export const updateCollege = async (
  id: string,
  payload: Partial<ICollege>
): Promise<ServicesReturnType> => {
  if (!Types.ObjectId.isValid(id)) {
    return ServicesReturn(400, 'Invalid college id', {
      error: 'INVALID_ID',
      message: 'Invalid college id',
    });
  }

  try {
    const updated = await CollegeModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return ServicesReturn(404, 'College not found', {
        error: 'NOT_FOUND',
        message: 'College not found',
      });
    }
    return ServicesReturn(200, 'College updated successfully', updated);
  } catch (err: any) {
    return ServicesReturn(500, 'Failed to update college', {
      error: 'DB_ERROR',
      message: err?.message || 'Failed to update college',
    });
  }
};
