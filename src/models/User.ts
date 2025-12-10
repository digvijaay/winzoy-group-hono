import { Schema, model, Document } from 'mongoose';
import { hashPassword } from '../utils/hash.js';

export interface IUser extends Document {
  fullName: string;
  // userName: string;
  email: string;
  password?: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    // userName: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   trim: true,
    // },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Do not return password by default
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // role_id //if user create role required
  },
  {
    timestamps: true,
  }
);

// Hash password before saving the user
userSchema.pre<IUser>('save', async function (next: any) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  try {
    this.password = await hashPassword(this.password);
    next();
  } catch (error) {
    next(error as Error);
  }
});
const User = model<IUser>('User', userSchema);
export default User;
