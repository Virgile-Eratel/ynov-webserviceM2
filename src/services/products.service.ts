import { Product } from "../types";
import { parseJsonFile, writeJsonFile } from "../utils/utils";

export const getProductsJson = async () => {
  const result = await parseJsonFile<Product[]>(
    '/Users/eratel/Documents/ynov/ynovM2/webservice/src/data/products.seed.json',
  );
  return result;
};

export const newProductsJson = async (data: Product[]) => {
    const result = await writeJsonFile('/Users/eratel/Documents/ynov/ynovM2/webservice/src/data/products.seed.json', data);
    return result;
}

export const createNewProduct = (data: Product[], product: Omit<Product, 'id'>): Product => {
  const arrayIds = data.map((product) => {return product.id})
    const maxId = Math.max(...arrayIds);
    const id = maxId + 1;
    return {
      id: id,
      ...product
    }
}