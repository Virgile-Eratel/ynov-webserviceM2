import { Request, Response } from 'express';
import { getProductsJson } from '../services/products.service';

export const getListProducts = async(_req: Request, res: Response) => {
  const data = await getProductsJson();
  res.status(200).json(data);
};
