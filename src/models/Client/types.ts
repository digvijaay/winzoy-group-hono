import { Document } from 'mongoose';
import { ClientPageName } from '../../utils/enum.js';

// --- Type for nested sub-objects ---
export interface Counselor {
  fullName: string;
  email: string;
}

export interface College {
  name: string;
  course?: string;
  status?: string;
  page_name: ClientPageName;
  counselor?: Counselor;
}

export interface ClientDocumentFile {
  name: string;
  url: string;
}

export interface GeneralInformation {
  email?: string;
  phone: string;
  address?: string;
  dob?: Date;
}

export interface Passport {
  number: string;
  expiry: Date;
}

export interface Visa {
  visaType: string;
  visaExpiry: Date;
}

export interface PaymentHistory {
  amount: number;
  date: Date;
}

export interface PaymentFee {
  applicationFee: number;
  materialFee: number;
  tuitionFee: number;
  offer: number;
  otherFee: number;
}

export interface Payment {
  history?: PaymentHistory[];
  fee?: PaymentFee;
}

export interface Remark {
  fullName: string;
  message: string;
  email: string;
  date: Date;
}

export interface Reference {
  fullName: string;
  phone?: string;
}

export interface DeletedBy {
  fullName: string;
  email: string;
  reason: string;
  date: Date;
}

// --- 1️⃣ Full Mongoose document type ---
export interface IClientDocument extends Document {
  fullName: string;
  colleges: College[];
  documents?: ClientDocumentFile[];
  generalInformation: GeneralInformation;
  visa?: Visa;
  passport?: Passport;
  payment?: Payment;
  remarks?: Remark[];
  reference?: Reference;
  deletedBy?: DeletedBy | null;
  createdAt: Date;
  updatedAt: Date;
}

// --- 2️⃣ Type for create request (payload) ---
export interface IClientCreate {
  fullName: string;
  colleges?: College[];
  documents?: ClientDocumentFile[];
  generalInformation: GeneralInformation;
  visa?: Visa;
  passport?: Passport;
  payment?: Payment;
  remarks?: Remark[];
  reference?: Reference;
  deletedBy?: DeletedBy | null;
}

// --- 3️⃣ Type for update request (payload) ---
export interface IClientUpdate extends IClientCreate {}
