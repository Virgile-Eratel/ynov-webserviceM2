import { Role } from "./role";

export interface User {
  id: string,
  email: string,
  passwordHash: string,
  role: Role
}