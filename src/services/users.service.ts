import path from 'path';
import { User } from '../types/user';
import { FILE_JSON_USERS } from '../utils/constants';
import { parseJsonFile, writeJsonFile } from '../utils/utils';
import { UserModel } from '../models/userSchema.model';
import mongoose from 'mongoose';

export const getUsersByEmail = async (email: string) => {
  const eamilRegex = new RegExp(`^${email}$`, 'i');
  
  const user = UserModel.findOne({email: {$regex: eamilRegex}})

  if(!user) return undefined
  return user;
};

export const getUserFromId = async (id: string) => {
  const user = await UserModel.findById(new mongoose.Types.ObjectId(id));
  return user?.toJSON() as unknown as User
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
  const newUser = await UserModel.create(body)
  if (newUser) {
    return { success: true, newUser };
  }
  return { success: false };
};
