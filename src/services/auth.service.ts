import bcrypt from 'bcryptjs';
import { User } from '../types/user';
import { getUsersByEmail, postUser } from './users.service';
import { sign } from '../utils/jwt';
import { Role } from '../types/role';

export const login = async (email: string, password: string): Promise<{token: string| null, isAuthenticated:boolean}> => {

  const user: User | undefined = await getUsersByEmail(email);
  if (!user) return {token: null, isAuthenticated: false};

  // création du hash
  // const salt = Number(process.env.PASSWORD_SALT) ?? 10;
  // const hashedPassword = await bcrypt.hash(user.passwordHash, salt);

  const token = sign({ id: user.id, role: user.role, email: user.email }, '2h');

  return {token, isAuthenticated: bcrypt.compareSync(password, user.passwordHash)};
};


export const register = async (email: string, password: string, role: Role): Promise<{user: Omit<User, 'passwordHash'> | null,token: string| null}> => {

  const user: User | undefined = await getUsersByEmail(email);
  if (user) throw Error("Erreur lors de la création du User");

  // création du hash
  const salt = Number(process.env.PASSWORD_SALT) ?? 10;
  const hashedPassword = await bcrypt.hash(password, salt);

  //enregistrement du user
  const body: Omit<User, 'id'> = {
      email,
      passwordHash: hashedPassword,
      role
    };

  const { success, newUser } = await postUser(body);

  if(!success) throw Error("Erreur lors de la création du User");

  if(newUser) {
    //création du token
    const token = sign({ id: newUser.id, role: newUser.role, email: newUser.email }, '2h');

    //création type retour user
    const returnUser: Omit<User, 'passwordHash'> = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role
    };

    return {user:returnUser, token};  
  }

  return {user: null, token: null}
  
};