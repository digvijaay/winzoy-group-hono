import { Schema, model } from 'mongoose';
import { IClientDocument } from './types';
import { clientPageName } from '@/utils/enum';

// --- Subschemas ---
const CounselorSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
  },
  { _id: false }
);

const CollegeSchema = new Schema(
  {
    name: { type: String, required: true },
    course: { type: String, required: true },
    status: { type: String, required: true },
    page_name: {
      type: String,
      enum: clientPageName, // enforce enum
      required: true,
    },
    counselor: { type: CounselorSchema, required: true },
  },
  { _id: false }
);

const DocumentFileSchema = new Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false }
);

const GeneralInformationSchema = new Schema(
  {
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    dob: { type: Date, required: true },
  },
  { _id: false }
);

const PassportSchema = new Schema(
  {
    number: { type: String, required: true },
    expiry: { type: Date, required: true },
  },
  { _id: false }
);

const VisaSchema = new Schema(
  {
    visaType: { type: String, required: true },
    visaExpiry: { type: Date, required: true },
  },
  { _id: false }
);

const PaymentHistorySchema = new Schema(
  {
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  { _id: false }
);

const PaymentFeeSchema = new Schema(
  {
    applicationFee: { type: Number, default: 0 },
    materialFee: { type: Number, default: 0 },
    tuitionFee: { type: Number, default: 0 },
    offer: { type: Number, default: 0 },
    otherFee: { type: Number, default: 0 },
  },
  { _id: false }
);

const PaymentSchema = new Schema(
  {
    history: { type: [PaymentHistorySchema], default: [] },
    fee: { type: PaymentFeeSchema, required: true },
  },
  { _id: false }
);

const RemarkSchema = new Schema(
  {
    fullName: { type: String, required: true },
    message: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { _id: false }
);

const ReferenceSchema = new Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { _id: false }
);

const DeletedBySchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    reason: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { _id: false }
);

// --- Main schema ---
const clientSchema = new Schema<IClientDocument>(
  {
    fullName: { type: String, required: true },
    colleges: { type: [CollegeSchema], default: [] },
    documents: { type: [DocumentFileSchema], default: [] },
    generalInformation: { type: GeneralInformationSchema, required: true },
    visa: { type: VisaSchema, required: true },
    passport: { type: PassportSchema, required: true },
    payment: { type: PaymentSchema, required: true },
    remarks: { type: [RemarkSchema], default: [] },
    reference: { type: ReferenceSchema, required: true },
    deletedBy: { type: DeletedBySchema, default: null },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

// --- Model ---
export const ClientModel = model<IClientDocument>('Client', clientSchema);
