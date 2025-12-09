import UserModel from '@/models/User';
import type { z } from 'zod';
import type { registerSchema, loginSchema } from '@/schemas/auth';
import { signAccessToken, signRefreshToken } from '@/utils/jwt';
import { setAuthCookies } from '@/utils/cookies';
import { Context } from 'hono';
import db from '@/config/db';
import { comparePassword } from '@/utils/hash';

type RegisterData = z.infer<typeof registerSchema>;
type LoginData = z.infer<typeof loginSchema>;

interface AuthResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

/**
 * Registers a new user.
 */
export const registerUser = async (
  c: Context,
  userData: RegisterData
): Promise<AuthResponse<{ user: any; token: string }>> => {
  try {
    db.connect();
    const existingUser = await UserModel.findOne({
      $or: [{ email: userData.email }, { fullName: userData.fullName }],
    });

    if (existingUser) {
      return {
        success: false,
        message: 'User with this email or username already exists.',
      };
    }

    const newUser = new UserModel(userData);
    await newUser.save();

    const { password, ...userJson } = newUser.toJSON();

    const payload = {
      sub: String(newUser.id),
      email: newUser.email,
      // tv: newUser.tokenVersion
    };
    const access = await signAccessToken(payload);
    const refresh = await signRefreshToken(payload);

    setAuthCookies(c, access, refresh);
    return {
      success: true,
      message: 'User registered successfully.',
      data: { user: userJson, token: access },
    };
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred during registration.',
    };
  }
};

/**
 * Logs in an existing user.
 */
export const loginUser = async (
  c: Context,
  credentials: LoginData
): Promise<AuthResponse<{ user: any; token: string }>> => {
  try {
    const { email, password } = credentials;
    db.connect();
    // find user and include password field
    const user = await UserModel.findOne({ email }).select('+password');

    if (!user || !user.password) {
      return { success: false, message: 'Invalid credentials.' };
    }

    // verify password with Bun.password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return { success: false, message: 'Invalid credentials.' };
    }

    // remove password from user JSON
    const userJson = user.toObject();
    delete userJson.password;

    // generate access token

    const payload = {
      sub: String(userJson.id),
      email: userJson.email,
      // tv: newUser.tokenVersion
    };
    const access = await signAccessToken(payload);
    const refresh = await signRefreshToken(payload);

    setAuthCookies(c, access, refresh);

    return {
      success: true,
      message: 'Login successful.',
      data: { user: userJson, token: access },
    };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'An error occurred during login.' };
  }
};
