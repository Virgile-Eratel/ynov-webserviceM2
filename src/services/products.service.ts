import mongoose, { QueryFilter} from 'mongoose';
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


export const getListProduct = async (limit?: number, page?: number, s?: string): Promise<Product[]> => {
  
  const limitF = limit ?? 10;
  const pageF = page ?? 1;

  const filter: QueryFilter<Product> = {};

  if (s) {
    const searchRegex = new RegExp(s, 'i');

    filter.$or = [
      { title: { $regex: searchRegex } },
      { description: { $regex: searchRegex } },
      { category: { $regex: searchRegex } },
    ];
  }

  const products = await ProductModel.find(filter)
    .skip((pageF - 1) * limitF)
    .limit(limitF)

  return products.map((product) => product.toJSON() as unknown as Product)
};


export const getListAllProduct = async () => {
  return ProductModel.find().exec();
};

export const postProduct = async (body: Omit<Product, 'id'>) => {
  const resultSaveProduct = await ProductModel.create(body);

  if (resultSaveProduct) {
    const newProduct = resultSaveProduct.toJSON() as unknown as Product
    return { success: true, newProduct };
  }
  return { success: false };
};

export const putProduct = async (idParams: string, payload: Product) => {
  const newProduct: Product = {
    ...payload,
  };

  const oldProduct = await getProductFromId(idParams);
  if (!oldProduct) return { success: false };

  const resultProduct = await ProductModel.findOneAndReplace({ _id: oldProduct._id }, newProduct, { new: true });
  if (resultProduct) {
    return { success: true, newProduct };
  }
  return { success: false };
};

export const patchProduct = async (idParams: string, payload: Product) => {
  const oldProduct = await getProductFromId(idParams);
  if (!oldProduct) return { success: false };

  const newProduct: Product = {
    ...oldProduct.toJSON(),
    ...payload,
    description: (payload.description ?? oldProduct.description) || undefined,
  };

  const resultProduct = await ProductModel.findOneAndUpdate({ _id: oldProduct._id }, newProduct, { new: true });
  if (resultProduct) {
    return { success: true, resultProduct };
  }
  return { success: false };
};

export const removeProduct = async (id: string) => {
  const success = await ProductModel.findByIdAndDelete(id);
  return !!success;
};

export const seedProducts = async () => {
  const products: Product[] = await getProductsJson();
  await ProductModel.deleteMany();
  await ProductModel.insertMany(products);
};
