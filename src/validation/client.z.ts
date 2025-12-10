// src/validation/client.z.ts

import { clientPageName } from '../utils/enum.js';
import {
  string,
  object,
  number,
  array,
  coerce,
  enum as z_enum,
  regexes,
} from 'zod';
import { urlRegex } from './regex.js';

// --- Reusable helpers ---
export const objectIdParamValidation = object({
  id: string().regex(/^[a-f\d]{24}$/i, 'Invalid Mongo ObjectId'),
});

// --- Sub-schemas ---
export const counselorValidation = object({
  fullName: string().min(1),
  email: string().regex(regexes.email, 'Invalid "Counselor" email address.'),
});

export const collegeValidation = object({
  name: string().min(1),
  course: string().min(1),
  status: string().min(1),
  page_name: z_enum(clientPageName).default('prospect'),
  counselor: counselorValidation.optional(),
});

export const documentFileValidation = object({
  name: string().min(1),
  url: string().regex(urlRegex, 'Invalid "Document File" URL.'),
});

export const generalInformationValidation = object({
  email: string()
    .regex(regexes.email, 'Invalid "General Information" email address.')
    .optional(),
  phone: string().min(1),
  address: string().optional(),
  dob: coerce.date().optional(),
});

export const passportValidation = object({
  number: string().min(1),
  expiry: coerce.date(),
});

export const visaValidation = object({
  visaType: string().min(1),
  visaExpiry: coerce.date(),
});

export const paymentHistoryValidation = object({
  amount: number().nonnegative(),
  date: coerce.date(),
});

export const paymentFeeValidation = object({
  applicationFee: number().default(0),
  materialFee: number().default(0),
  tuitionFee: number().default(0),
  offer: number().default(0),
  otherFee: number().default(0),
});

export const paymentValidation = object({
  history: array(paymentHistoryValidation).default([]),
  fee: paymentFeeValidation.optional(),
});

export const remarkValidation = object({
  fullName: string().min(1),
  message: string().min(1),
  email: string().regex(regexes.email, 'Invalid "Remark" email address.'),
  date: coerce.date(),
});

export const referenceValidation = object({
  fullName: string().min(1),
  phone: string().optional(),
});

export const deletedByValidation = object({
  fullName: string().min(1),
  email: string().regex(regexes.email, 'Invalid "Deleted By" email address.'),
  reason: string().min(1),
  date: coerce.date(),
});

// --- CREATE schema (full payload) ---
export const clientCreateValidation = object({
  fullName: string().min(1),
  colleges: array(collegeValidation).optional(),
  documents: array(documentFileValidation).default([]),
  generalInformation: generalInformationValidation,
  visa: visaValidation.optional(),
  passport: passportValidation.optional(),
  payment: paymentValidation.optional(),
  remarks: array(remarkValidation).default([]),
  reference: referenceValidation.optional(),
  deletedBy: deletedByValidation.optional(),
});

// --- PUT schema (mirrors create, can also use partial) ---
export const clientPutValidation = clientCreateValidation.partial();

// --- DELETE body for soft-delete ---
export const clientDeleteBodyValidation = deletedByValidation;

// --- Response schema ---
export const clientResponseValidation = clientCreateValidation.extend({
  _id: string(),
  createdAt: coerce.date(),
  updatedAt: coerce.date(),
});
