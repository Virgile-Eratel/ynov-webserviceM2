import { Role } from "../types/role";
import { User } from "../types/user";

export interface AuthServiceApi {
  login: (email: string, password: string) => Promise<{token: string| null, isAuthenticated:boolean}>;
  register: (email: string, password: string, role: Role) => Promise<{user: Omit<User, 'passwordHash'> | null,token: string| null}>
}