// src/models/College/index.ts

import { Schema, model } from 'mongoose';
import {
  IAddress,
  ICollegeDocument,
  IContactPerson,
  ICourse,
  IDuration,
} from './types.js';

// ---------------------
// Sub Schemas
// ---------------------

const AddressSchema = new Schema<IAddress>(
  {
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    country: { type: String, default: '' },
  },
  { _id: false }
);

const ContactPersonSchema = new Schema<IContactPerson>(
  {
    name: { type: String, default: '' },
    phone: { type: String, default: '' },
  },
  { _id: false }
);

/**
 * Duration sub-schema used inside CourseSchema
 */
const DurationSchema = new Schema<IDuration>(
  {
    value: { type: Number, required: true, default: 60 },
    unit: {
      type: String,
      enum: ['days', 'weeks', 'months', 'years'],
      required: true,
      default: 'days',
    },
  },
  { _id: false }
);

/**
 * Course schema now includes duration and fee fields
 */
const CourseSchema = new Schema<ICourse>(
  {
    name: { type: String, required: true },

    // Duration for the course
    duration: {
      type: DurationSchema,
    },

    // Fees (numbers, non-negative)
    materialFee: { type: Number, default: 0, min: 0 },
    tuitionFee: { type: Number, default: 0, min: 0 },

    // totalFee can be stored or computed; default to sum of material + tuition
    totalFee: {
      type: Number,
      default: 0,
      //   function () {
      //     // @ts-ignore - `this` refers to course subdocument
      //     return (this.materialFee || 0) + (this.tuitionFee || 0);
      //   },
      min: 0,
    },

    // discount — interpret as an amount (not percent). If you prefer percent, change naming/validation.
    discount: { type: Number, default: 0, min: 0 },

    // afterDiscount — default computed from totalFee - discount
    afterDiscount: {
      type: Number,
      //   default: function () {
      //     // @ts-ignore
      //     const total =
      //       this.totalFee ?? (this.materialFee || 0) + (this.tuitionFee || 0);
      //     // @ts-ignore
      //     const discount = this.discount || 0;
      //     return Math.max(0, total - discount);
      //   },
      default: 0,
      min: 0,
    },
  },
  { _id: false }
);

// ---------------------
// Main College Schema
// ---------------------

const CollegeSchema = new Schema<ICollegeDocument>(
  {
    name: { type: String, required: true },

    address: {
      type: AddressSchema,
      default: () => ({
        street: '',
        city: '',
        state: '',
        country: '',
      }),
    },

    contactPerson: {
      type: ContactPersonSchema,
      default: () => ({ name: '', phone: '' }),
    },

    // Courses array with duration & fees per course
    courses: {
      type: [CourseSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// ---------------------
// Optional: Pre-save hook to ensure totals are in sync
// ---------------------
// This keeps `totalFee` and `afterDiscount` consistent if someone mutates materialFee/tuitionFee/discount.
// CollegeSchema.pre('save', function (next) {
//   if (Array.isArray(this.courses)) {
//     this.courses = this.courses.map((c: any) => {
//       const material = Number(c.materialFee || 0);
//       const tuition = Number(c.tuitionFee || 0);
//       const total = Number(c.totalFee ?? material + tuition);
//       const discount = Number(c.discount || 0);
//       const after = Math.max(0, total - discount);

//       return {
//         ...c,
//         materialFee: material,
//         tuitionFee: tuition,
//         totalFee: total,
//         discount,
//         afterDiscount: after,
//       };
//     });
//   }
//   next();
// });

// ---------------------
// Export
// ---------------------
const CollegeModel = model<ICollegeDocument>('College', CollegeSchema);

export default CollegeModel;
