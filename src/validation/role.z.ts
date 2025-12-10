import {
  object,
  string,
  boolean,
  array,
  enum as z_enum,
  type infer as zInfer,
} from 'zod';

// ---- Action Schema ----
export const actionValidation = object({
  action: z_enum(['create', 'read', 'update', 'delete']),
  allowed: boolean(),
});

// ---- Permission Schema ----
export const permissionValidation = object({
  resource: string().min(1, 'Resource name is required'),
  actions: array(actionValidation).nonempty('At least one action is required'),
});

// ---- Role Schema ----
export const roleValidation = object({
  roleId: string().min(2, 'Role ID is required'),
  roleLabel: string().min(2, 'Role label is required'),
  permissions: array(permissionValidation).nonempty(
    'At least one permission is required'
  ),
});

// ---- Inferred Type ----
export type RoleInput = zInfer<typeof roleValidation>;

// ---- Inferred Type ----
export type PermissionInput = zInfer<typeof permissionValidation>;

// ---- Inferred Type ----
export type ActionInput = zInfer<typeof actionValidation>;
