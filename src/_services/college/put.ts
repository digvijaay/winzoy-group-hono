import CollegeModel from '../../models/College/index.js';
import { ServicesReturn } from '../../utils/hendler.js';
import { Types } from 'mongoose';

export const deleteCollege = async (
  id: string
): Promise<ServicesReturnType> => {
  if (!Types.ObjectId.isValid(id)) {
    return ServicesReturn(400, 'Invalid college id', {
      error: 'INVALID_ID',
      message: 'Invalid college id',
    });
  }

  try {
    const deleted = await CollegeModel.findByIdAndDelete(id);
    if (!deleted) {
      return ServicesReturn(404, 'College not found', {
        error: 'NOT_FOUND',
        message: 'College not found',
      });
    }
    return ServicesReturn(200, 'College deleted successfully', deleted);
  } catch (err: any) {
    return ServicesReturn(500, 'Failed to delete college', {
      error: 'DB_ERROR',
      message: err?.message || 'Failed to delete college',
    });
  }
};
