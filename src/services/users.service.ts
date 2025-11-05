import { User } from "../types/user";
import { FILE_JSON_USERS } from "../utils/constants";
import { parseJsonFile } from "../utils/utils";
import path from 'path';


export const getUsersByEmail = async (email: string): Promise<User | undefined> => {
  const users: User[] = await parseJsonFile<User[]>(path.resolve(FILE_JSON_USERS));
  return users.find((u: User) => u.email.toLowerCase() === email);
}