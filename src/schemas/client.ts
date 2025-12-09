import { z } from 'zod';

// Reusable helpers
export const ObjectIdParam = z.object({
  id: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid Mongo ObjectId'),
});

export const PaginationQuery = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  q: z.string().trim().optional(),
});

// Sub-schemas
export const CounselorZ = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
});

export const CollegeZ = z.object({
  name: z.string().min(1),
  course: z.string().min(1),
  status: z.string().min(1),
  page_name: z.string().min(1),
  counselor: CounselorZ,
});

export const DocumentFileZ = z.object({
  name: z.string().min(1),
  url: z.string().url(),
});

export const GeneralInformationZ = z.object({
  email: z.string().email(),
  phone: z.string().min(1),
  address: z.string().min(1),
  dob: z.coerce.date(),
});

export const PassportZ = z.object({
  number: z.string().min(1),
  expiry: z.coerce.date(),
});

export const VisaZ = z.object({
  visaType: z.string().min(1),
  visaExpiry: z.coerce.date(),
});

export const PaymentHistoryZ = z.object({
  amount: z.number().nonnegative(),
  date: z.coerce.date(),
});

export const PaymentFeeZ = z.object({
  applicationFee: z.number().default(0),
  materialFee: z.number().default(0),
  tuitionFee: z.number().default(0),
  offer: z.number().default(0),
  otherFee: z.number().default(0),
});

export const PaymentZ = z.object({
  history: z.array(PaymentHistoryZ).default([]),
  fee: PaymentFeeZ, // required
});

export const RemarkZ = z.object({
  fullName: z.string().min(1),
  message: z.string().min(1),
  email: z.string().email(),
  date: z.coerce.date(),
});

export const ReferenceZ = z.object({
  fullName: z.string().min(1),
  phone: z.string().min(1),
});

export const DeletedByZ = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  reason: z.string().min(1),
  date: z.coerce.date(),
});

// CREATE schema (full payload)
export const ClientCreateZ = z.object({
  fullName: z.string().min(1),
  colleges: z.array(CollegeZ).default([]),
  documents: z.array(DocumentFileZ).default([]),
  generalInformation: GeneralInformationZ,
  visa: VisaZ,
  passport: PassportZ,
  payment: PaymentZ,
  remarks: z.array(RemarkZ).default([]),
  reference: ReferenceZ,
  deletedBy: DeletedByZ.nullable().optional(),
});

// PUT schema (also full payload; mirrors create)
export const ClientPutZ = ClientCreateZ;

// DELETE body for soft-delete
export const ClientDeleteBodyZ = DeletedByZ;

// Optional: response schema (basic)
export const ClientResponseZ = ClientCreateZ.extend({
  _id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
