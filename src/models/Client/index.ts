import { Schema, model } from 'mongoose';
import { clientPageName } from '../../utils/enum.js';
import { IClientDocument } from './types.js';

// --- Interfaces ---
const clientSchema = new Schema<IClientDocument>(
  {
    fullName: { type: String, required: true },
    colleges: {
      type: [
        {
          name: { type: String },
          course: { type: String },
          status: { type: String },
          page_name: {
            type: String,
            enum: clientPageName,
          },
          counselor: {
            fullName: { type: String },
            email: { type: String },
          },
        },
      ],
      default: [
        {
          name: '',
          course: '',
          status: '',
          page_name: clientPageName[0],
          counselor: {
            fullName: '',
            email: '',
          },
        },
      ],
    },

    documents: {
      type: [
        {
          name: { type: String, required: true },
          url: { type: String, required: true },
        },
      ],
      default: [],
    },

    generalInformation: {
      email: { type: String },
      phone: { type: String, required: true },
      address: { type: String },
      dob: { type: Date },
    },

    visa: {
      visaType: { type: String },
      visaExpiry: { type: Date },
    },

    passport: {
      number: { type: String },
      expiry: { type: Date },
    },

    payment: {
      history: {
        type: [
          {
            amount: { type: Number, required: true },
            date: { type: Date, required: true },
          },
        ],
        default: [],
      },
      fee: {
        applicationFee: { type: Number, default: 0 },
        materialFee: { type: Number, default: 0 },
        tuitionFee: { type: Number, default: 0 },
        offer: { type: Number, default: 0 },
        otherFee: { type: Number, default: 0 },
      },
    },

    remarks: {
      type: [
        {
          fullName: { type: String, required: true },
          message: { type: String, required: true },
          email: { type: String, required: true },
          date: { type: Date, required: true },
        },
      ],
      default: [],
    },

    reference: {
      fullName: { type: String },
      phone: { type: String },
    },

    deletedBy: {
      fullName: { type: String },
      email: { type: String },
      reason: { type: String },
      date: { type: Date },
    },
  },
  {
    timestamps: true,
  }
);

// --- Model ---
const ClientModel = model<IClientDocument>('Client', clientSchema);

export default ClientModel;
