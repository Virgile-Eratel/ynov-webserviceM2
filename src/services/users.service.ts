import path from 'path';
import { User } from '../types/user';
import { FILE_JSON_USERS } from '../utils/constants';
import { parseJsonFile, writeJsonFile } from '../utils/utils';

export const getUsersByEmail = async (email: string): Promise<User | undefined> => {
  const users: User[] = await parseJsonFile<User[]>(path.resolve(FILE_JSON_USERS));
  return users.find((u: User) => u.email.toLowerCase() === email);
};

export const createNewUser = (user: Omit<User, 'id'>): User => {
  return {
    id: `id-${Date.now()}`,
    ...user,
  };
};

export const getUsersJson = async () => {
  return await parseJsonFile<User[]>(path.resolve(FILE_JSON_USERS));
};

export const newUsersJson = async (data: User[]) => {
  return await writeJsonFile(path.resolve(FILE_JSON_USERS), data);
};

export const postUser = async (body: Omit<User, 'id'>) => {
  const data = await getUsersJson();

  const newUser = createNewUser(body);

  data.push(newUser);

  const resultSaveProduct = await newUsersJson(data);
  if (resultSaveProduct) {
    return { success: true, newUser };
  }
  return { success: false };
};
