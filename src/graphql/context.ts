import { Request } from 'express';
import * as ProductsService from '../services/products.service';
import { ProductsServiceApi } from '../interfaces/productsServiceApi.interface';

export const buildContext = (req: Request) => {
  return {
    req,
    services: {
      products: ProductsService satisfies ProductsServiceApi
    }
  }
};
