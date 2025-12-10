// src/validation/college.z.ts

import { object, string, array, number, enum as zEnum } from 'zod';
import { objectIdParamValidation } from './client.z.js';
import { phoneRegex } from './regex.js';

// ---------------------
// Address Validation
// ---------------------
export const addressValidation = object({
  street: string().optional(),
  city: string().optional(),
  state: string().optional(),
  country: string().optional(),
});

// ---------------------
// Contact Person Validation
// ---------------------
export const contactPersonValidation = object({
  name: string().min(1),
  phone: string().regex(phoneRegex, 'Invalid phone number'),
});

// ---------------------
// Duration Validation
// ---------------------
export const durationValidation = object({
  value: number().min(1), // at least 1 day/week/etc.
  unit: zEnum(['days', 'weeks', 'months', 'years']),
});

// ---------------------
// Course Validation
// ---------------------
export const courseValidation = object({
  name: string().min(1),

  // Optional fields with defaults handled in backend logic
  duration: durationValidation.optional(),

  materialFee: number().min(0).optional(),
  tuitionFee: number().min(0).optional(),
  totalFee: number().min(0).optional(),
  discount: number().min(0).optional(),
  afterDiscount: number().min(0).optional(),
});

// ---------------------
// CREATE Schema
// ---------------------
export const collegeCreateValidation = object({
  name: string().min(1),
  address: addressValidation.optional(),
  contactPerson: contactPersonValidation.optional(),
  courses: array(courseValidation).default([]),
});

// ---------------------
// PUT Schema — partial updates allowed
// ---------------------
export const collegePutValidation = collegeCreateValidation.partial();

// Re-export ObjectId validator
export { objectIdParamValidation };
