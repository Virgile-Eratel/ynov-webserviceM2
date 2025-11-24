import bcrypt from 'bcryptjs';
import { User } from '../types/user';
import { getUsersByEmail } from './users.service';
import { sign } from '../utils/jwt';

export const login = async (email: string, password: string): Promise<{token: string| null, isAuthenticated:boolean}> => {

  const user: User | undefined = await getUsersByEmail(email);
  if (!user) return {token: null, isAuthenticated: false};

  // création du hash
  // const salt = Number(process.env.PASSWORD_SALT) ?? 10;
  // const hashedPassword = await bcrypt.hash(user.passwordHash, salt);

  const token = sign({ id: user.id, role: user.role, email: user.email }, '2h');

  return {token, isAuthenticated: bcrypt.compareSync(password, user.passwordHash)};
};
