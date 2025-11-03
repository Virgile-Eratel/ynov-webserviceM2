import { Request, Response } from 'express';
import { getProductsJson } from '../services/products.service';

export const getList = async (_req: Request, res: Response): Promise<void> => {
  const data = await getProductsJson();
  res.status(200).json(data);
};

export const get = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const data = await getProductsJson();
  const product = data.filter((product) => product.id === id);
  if (product.length > 0) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: `Produit id ${id} non trouvé` });
  }
};
