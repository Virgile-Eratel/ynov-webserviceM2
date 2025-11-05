export const RoleEnum = {
  admin: "admin",
  user: "user",
} as const;

export type Role = keyof typeof RoleEnum;

