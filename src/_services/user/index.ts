import db from '../../config/db.js';
import User from '../../models/User.js';

/**
 * Retrieves a single user's profile by their ID (used for the logged-in user).
 * @param userId The ID of the user to retrieve.
 * @returns An object containing the user or an error.
 */
export const getProfile = async (userId: string) => {
  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return { error: 'Not Found', message: 'User not found.', status: 404 };
    }
    return { user };
  } catch (error) {
    console.error('Error in getProfile:', error);
    return {
      error: 'Server Error',
      message: 'Could not retrieve user profile.',
      status: 500,
    };
  }
};

/**
 * Retrieves a single user by their ID from URL params.
 * @param userId The ID of the user to retrieve.
 * @returns An object containing the user or an error.
 */
export const getUserById = async (userId: string) => {
  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return { error: 'Not Found', message: 'User not found.', status: 404 };
    }
    return { user };
  } catch (error) {
    console.error('Error in getUserById:', error);
    return {
      error: 'Server Error',
      message: 'Could not retrieve user.',
      status: 500,
    };
  }
};

/**
 * Retrieves all users from the database.
 * @returns An object containing an array of users or an error.
 */
export const getAllUsers = async () => {
  try {
    db.connect();
    const users = await User.find().select('-password');
    return { users };
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    return {
      error: 'Server Error',
      message: 'Could not retrieve users.',
      status: 500,
    };
  }
};
