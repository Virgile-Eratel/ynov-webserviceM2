import mongoose from 'mongoose';
import path from 'path';
import { ProductModel } from '../models/productSchema.model';
import { Product } from '../types';
import { FILE_JSON } from '../utils/constants';
import { parseJsonFile, writeJsonFile } from '../utils/utils';

export const getProductsJson = async () => {
  return await parseJsonFile<Product[]>(path.resolve(FILE_JSON));
};

// ancienne version
export const newProductsJson = async (data: Product[]) => {
  return await writeJsonFile(path.resolve(FILE_JSON), data);
};

export const getProductFromId = async (id: string) => {
  return await ProductModel.findById(new mongoose.Types.ObjectId(id));
};

export const getListProduct = async (limit: number, page: number, s: any) => {
  const data = await ProductModel.find().exec();
  let formatedData = data.map((p) => p.toJSON()) as unknown as Product[];
  if (s) {
    //recherche
    formatedData = researchProduct(s, formatedData);
  }
  if (limit && page) {
    //pagination
    formatedData = formatedData.slice((page - 1) * limit, page * limit);
  }

  return formatedData ?? [];
};

export const getListAllProduct = async () => {
  return ProductModel.find().exec();
};

const researchProduct = (research: string, data: Product[]): Product[] => {
  const valueLower = research.toLowerCase();

  return data.filter(
    (product) =>
      product.title?.toLowerCase().includes(valueLower) ||
      (product.description && product.description?.toLowerCase().includes(valueLower)) ||
      product.category?.toLowerCase().includes(valueLower),
  );
};

export const postProduct = async (body: Omit<Product, 'id'>) => {
  const resultSaveProduct = await ProductModel.create(body);

  if (resultSaveProduct) {
    return { success: true, newProduct: resultSaveProduct };
  }
  return { success: false };
};

export const putProduct = async (idParams: string, payload: Product) => {
  const newProduct: Product = {
    ...payload,
  };

  const oldProduct = await getProductFromId(idParams);
  if (!oldProduct) return { success: false };

  const resultProduct = await ProductModel.findOneAndReplace({ _id: oldProduct._id }, newProduct);
  if (resultProduct) {
    return { success: true, newProduct };
  }
  return { success: false };
};

export const patchProduct = async (idParams: string, payload: Product) => {
  const oldProduct = await getProductFromId(idParams);
  if (!oldProduct) return { success: false };

  const newProduct: Product = {
    ...oldProduct,
    ...payload,
    description: (payload.description ?? oldProduct.description) || undefined,
  };

  const resultProduct = await ProductModel.findOneAndUpdate({ _id: oldProduct._id }, newProduct);
  if (resultProduct) {
    return { success: true, resultProduct: resultProduct.toJSON<Product>() };
  }
  return { success: false };
};

export const removeProduct = async (id: string) => {
  const success = await ProductModel.findByIdAndDelete(id);
  return success;
};

export const seedProducts = async () => {
  const products: Product[] = await getProductsJson();
  await ProductModel.deleteMany();
  await ProductModel.insertMany(products);
};
