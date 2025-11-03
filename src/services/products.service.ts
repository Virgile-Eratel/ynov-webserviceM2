import { Product } from "../types";
import { parseJsonFile } from "../utils/utils";

export const getProductsJson = async () => {
  const result = await parseJsonFile<Product[]>(
    '/Users/eratel/Documents/ynov/ynovM2/webservice/src/data/products.seed.json',
  );
  return result;
};