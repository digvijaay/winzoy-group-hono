import { permissionAction, PermissionAction } from '../utils/enum.js';
import mongoose, { Schema, Document, Model } from 'mongoose';

// ---- Interfaces ----
export interface IAction {
  action: PermissionAction;
  allowed: boolean;
}

export interface IPermission {
  resource: string;
  actions: IAction[];
}

export interface IRole extends Document {
  roleId: string;
  roleLabel: string;
  permissions: IPermission[];
}

// ---- Schemas ----
const ActionSchema = new Schema<IAction>(
  {
    action: {
      type: String,
      enum: permissionAction, // restrict actions
      required: true,
    },
    allowed: { type: Boolean, default: false },
  },
  { _id: false }
);

const PermissionSchema = new Schema<IPermission>(
  {
    resource: { type: String, required: true },
    actions: { type: [ActionSchema], required: true },
  },
  { _id: false }
);

const RoleSchema = new Schema<IRole>(
  {
    roleId: { type: String, required: true, unique: true },
    roleLabel: { type: String, required: true },
    permissions: { type: [PermissionSchema], required: true },
  },
  { timestamps: true }
);

// ---- Model ----
const RoleModel: Model<IRole> = mongoose.model<IRole>('Role', RoleSchema);

export default RoleModel;
