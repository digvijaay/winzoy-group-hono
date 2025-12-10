//src/models/College/types.ts

import { Document } from 'mongoose';

// ---------------------
// Type Definitions
// ---------------------

export interface IAddress {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface IContactPerson {
  name: string;
  phone: string;
}

/**
 * Duration: numeric value + unit.
 * Example: { value: 60, unit: 'days' }
 */
export interface IDuration {
  value: number;
  unit: 'days' | 'weeks' | 'months' | 'years';
}

export interface ICourse {
  name: string;
  // Duration and fees
  duration?: IDuration; // e.g. { value: 60, unit: 'days' }
  materialFee?: number;
  tuitionFee?: number;
  totalFee?: number;
  discount?: number; // interpret as you like (amount or percent)
  afterDiscount?: number; // totalFee - discount (or computed value)
}

export interface ICollege {
  name: string;
  address?: IAddress;
  contactPerson?: IContactPerson;
  courses?: ICourse[];
}

export interface ICollegeDocument extends ICollege, Document {
  createdAt: Date;
  updatedAt: Date;
}
