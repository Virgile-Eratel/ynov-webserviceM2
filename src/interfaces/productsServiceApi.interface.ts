import { Product } from "../types";

export interface ProductsServiceApi {
  getProductFromId: (id: string) => Promise<Product | null | undefined>;
  getListProduct: (limit?: number, page?: number, s?: string) => Promise<Product[]>;
  postProduct: (body: Omit<Product, 'id'>) => Promise<{success: boolean, newProduct?: Product}>;
  putProduct: (idParams: string, payload: Product) => Promise<{success: boolean, newProduct?: Product}>;
  patchProduct: (idParams: string, payload: Product) => Promise<{success: boolean, resultProduct?: Product}>;
  removeProduct: (id: string) => Promise<boolean>;
}