import { Request, Response } from 'express';
import {
  getListAllProduct,
  getListProduct,
  getProductFromId,
  patchProduct,
  postProduct,
  putProduct,
  removeProduct,
  seedProducts,
} from '../services/products.service';
import { Product } from '../types';

export const getList = async (req: Request, res: Response): Promise<void> => {
  //Pour la recherche mettre tt en minuscule
  const { limit, page, s } = req.query;
  let data = [];
  if (limit || page || s) data = await getListProduct(Number(limit), Number(page), s);
  else data = await getListAllProduct();
  //utilisation du logger
  //req.log.warn('test');
  res.status(200).json(data);
};

export const get = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const product = await getProductFromId(id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: `Product id ${id} not found` });
  }
};

export const post = async (req: Request, res: Response) => {
  const { title, category, description, ean, specs, price } = req.body ?? {};

  if (!(title && category && ean && specs && price !== undefined)) {
    return res.status(400).json({ message: `Error type Product` });
  }
  const body: Omit<Product, 'id'> = {
    title,
    category,
    ean,
    description,
    specs,
    price,
  };

  const { success, newProduct } = await postProduct(body);

  if (success) {
    res.status(201).json(newProduct);
  } else {
    res.status(500).json({ message: `Error create Product` });
  }
};

export const patch = async (req: Request, res: Response) => {
  const idParams = req.params.id;
  const { title, category, ean, specs, price } = req.body ?? {};

  if (!(title && category && ean && specs && price)) {
    return res.status(400).json({ message: `Error type Product` });
  }

  const { id, ...payload } = req.body;

  const { success, resultProduct } = await patchProduct(idParams, payload);

  if (success) {
    res.status(200).json(resultProduct);
  } else {
    res.status(500).json({ message: `Error patch Product` });
  }
};

export const put = async (req: Request, res: Response) => {
  const idParams = req.params.id;

  const { id, ...payload } = req.body;

  const { success, newProduct } = await putProduct(idParams, payload);

  if (success) {
    res.status(200).json(newProduct);
  } else {
    res.status(500).json({ message: `Error put Product` });
  }
};

export const remove = async (req: Request, res: Response) => {
  const id = req.params.id;
  const success = await removeProduct(id);
  if (success) {
    res.status(204).json();
  } else {
    res.status(500).json({ message: `Error delete Product` });
  }
};

export const seed = async (_req: Request, res: Response) => {
  await seedProducts();
  res.status(201).json({ message: 'products seed generated' });
};
