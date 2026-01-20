import { Request } from 'express';
import { ProductsServiceApi } from '../../interfaces/productsServiceApi.interface';
import { AuthServiceApi } from '../../interfaces/authServiceApi.interface';
import { User } from '../../types/user';

export type GraphQlContext = {
  req?: Request;
  user?: User;
  services: {
    products: ProductsServiceApi;
    auth: AuthServiceApi;
  };
};
