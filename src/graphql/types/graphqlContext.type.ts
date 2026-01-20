import { Request } from 'express';
import { ProductsServiceApi } from '../../interfaces/productsServiceApi.interface';

export type GraphQlContext = {
  req: Request;
  services: {
    products: ProductsServiceApi;
  };
};
