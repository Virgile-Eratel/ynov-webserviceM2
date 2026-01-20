import { Request } from 'express';
import { AuthServiceApi } from '../interfaces/authServiceApi.interface';
import { ProductsServiceApi } from '../interfaces/productsServiceApi.interface';
import * as AuthService from '../services/auth.service';
import * as ProductsService from '../services/products.service';
import { getUserFromId } from '../services/users.service';
import { User } from '../types/user';
import { verify } from '../utils/jwt';

const parseBearerToken = (req: Request): string | null => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return null;

  const [type, token] = authHeader.split(' ');
  if (type.toLowerCase() !== 'bearer' || !token) return null;

  return token;
};

export const buildContext = async (req: Request) => {
  let user: User | undefined = undefined;
  const token: string | null = parseBearerToken(req);
  if (token) {
    const { id } = verify(token);
    user = await getUserFromId(id);
  }
  return {
    req,
    user,
    services: {
      products: ProductsService satisfies ProductsServiceApi,
      auth: AuthService satisfies AuthServiceApi,
    },
  };
};
