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

export const getProductFromId = async (id: number) => {
  return (await getProductsJson()).filter((product) => product.id === id)[0];
};

export const saveProduct = async (product: Product) => {
  const successRemoveProduct = await removeProduct(product.id);
  if (!successRemoveProduct) {
    return false;
  }
  const data = await getProductsJson();
  //ajout du produit modifié
  data.push(product);

  return await newProductsJson(data);
};

export const removeProduct = async (id: number) => {
  const data = await getProductsJson();

  const objWithIdIndex = data.findIndex((p) => p.id === id);

  if (objWithIdIndex > -1) {
    //suppression dans le tableau
    data.splice(objWithIdIndex, 1);
    await newProductsJson(data);
    return true;
  }
  return false;
};
