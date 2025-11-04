import path from 'path';
import { Product } from '../types';
import { FILE_JSON } from '../utils/constants';
import { parseJsonFile, writeJsonFile } from '../utils/utils';

export const getProductsJson = async () => {
  const result = await parseJsonFile<Product[]>(path.resolve(FILE_JSON));
  return result;
};

export const newProductsJson = async (data: Product[]) => {
  return await writeJsonFile(path.resolve(FILE_JSON), data);
};

export const createNewProduct = (data: Product[], product: Omit<Product, 'id'>): Product => {
  const arrayIds = data.map((product) => product.id);
  const maxId = Math.max(...arrayIds);
  const id = maxId + 1;
  return {
    id,
    ...product,
  };
};
