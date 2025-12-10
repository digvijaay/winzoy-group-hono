// src/_services/college/get.ts
import CollegeModel from '../../models/College/index.js';
import { ServicesReturn } from '../../utils/hendler.js';

/**
 * Service return shape used across services in your project:
 * ServicesReturn: { status: number, message: string, body: any }
 */

export const getAllColleges = async (): Promise<ServicesReturnType> => {
  try {
    const colleges = await CollegeModel.find({}).lean();
    return ServicesReturn(200, 'Colleges fetched successfully', colleges);
  } catch (err) {
    return ServicesReturn(500, 'Failed to fetch colleges', {
      error: 'DB_ERROR',
      message: 'Failed to fetch colleges',
    });
  }
};
