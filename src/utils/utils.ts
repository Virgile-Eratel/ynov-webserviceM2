import fs from 'fs';
import path from 'path';

export const parseJsonFile = async <T>(filePath: string) => {
  const file: string = path.resolve(filePath);
  const data: string = fs.readFileSync(file, 'utf8');
  return JSON.parse(data) as T;
};

export const writeJsonFile = async (filePath: string, data: unknown): Promise<boolean> => {
  const file: string = path.resolve(filePath);
  try {
    fs.writeFileSync(file, JSON.stringify(data))
  } catch (e: unknown){
    return false
  }
  return true
}