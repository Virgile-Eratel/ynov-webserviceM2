import path from 'path';
import { Product } from '../types';
import { FILE_JSON } from '../utils/constants';
import { parseJsonFile, writeJsonFile } from '../utils/utils';

export const getProductsJson = async () => {
  return await parseJsonFile<Product[]>(path.resolve(FILE_JSON));
};

export const newProductsJson = async (data: Product[]) => {
  return await writeJsonFile(path.resolve(FILE_JSON), data);
};

export const createNewProduct = (product: Omit<Product, 'id'>): Product => {
  return {
    id: Date.now(),
    ...product,
  };
};
