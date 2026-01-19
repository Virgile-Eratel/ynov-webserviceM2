import { Request, Response } from 'express';
import {
  getListAllProduct,
  getListProduct,
  getProductFromId,
  getProductsJson,
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
  if (limit || page || s)
    data = await getListProduct(Number(limit), Number(page), s);
  else 
    data = await getListAllProduct();
  //utilisation du logger
  //req.log.warn('test');
  res.status(200).json(data);
};

export const get = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const data = await getProductsJson();
  const product = data.filter((product) => product.id === id);
  if (product.length > 0) {
    res.status(200).json(product[0]);
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
  const idParams = Number(req.params.id);
  const { title, category, ean, specs, price } = req.body ?? {};

  if (!(title && category && ean && specs && price)) {
    return res.status(400).json({ message: `Error type Product` });
  }

  const oldProduct = await getProductFromId(idParams);
  if (!oldProduct) {
    return res.status(404).json({ message: `Error Product not exist` });
  }

  const { id, ...payload } = req.body;

  const { success, newProduct } = await patchProduct(payload, oldProduct);

  if (success) {
    res.status(200).json(newProduct);
  } else {
    res.status(500).json({ message: `Error patch Product` });
  }
};

export const put = async (req: Request, res: Response) => {
  const idParams = Number(req.params.id);

  const oldProduct = await getProductFromId(idParams);
  if (!oldProduct) {
    return res.status(404).json({ message: `Error Product not exist` });
  }

  const { id, ...payload } = req.body;

  const { success, newProduct } = await putProduct({ ...oldProduct, ...payload }, oldProduct.id);

  if (success) {
    res.status(200).json(newProduct);
  } else {
    res.status(500).json({ message: `Error put Product` });
  }
};

export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const success = await removeProduct(id);
  if (success) {
    res.status(204).json();
  } else {
    res.status(500).json({ message: `Error put Product` });
  }
};


export const seed = async (_req: Request, res: Response) => {
  await seedProducts();
  res.status(201).json({message: 'products seed generated'});
}