export const clientPageName = [
  'prospect',
  'offer',
  'client',
  'visa',
  'extra',
  'deleted',
  'backout',
];

export type ClientPageName = (typeof clientPageName)[number];

export const permissionAction = [
  'create',
  'read',
  'update',
  'delete',
  'export',
  'import',
];

export type PermissionAction = (typeof permissionAction)[number];
