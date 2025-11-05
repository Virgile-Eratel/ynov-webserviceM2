import bcrypt from 'bcryptjs';
import { User } from '../types/user';
import { getUsersByEmail } from './users.service';

export const login = async (email: string, password: string): Promise<boolean> => {
  console.dir({ email, password });

  const user: User | undefined = await getUsersByEmail(email);
  if (!user) return false;

  // création du hash
  // const salt = Number(process.env.PASSWORD_SALT) ?? 10;
  // const hashedPassword = await bcrypt.hash(user.passwordHash, salt);

  return bcrypt.compareSync(password, user.passwordHash);
};
