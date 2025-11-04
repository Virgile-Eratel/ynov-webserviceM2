import { Request, Response } from 'express';
import { createNewProduct, getProductsJson, newProductsJson } from '../services/products.service';
import { Product } from '../types';

export const getList = async (_req: Request, res: Response): Promise<void> => {
  const data = await getProductsJson();
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
  const { title, category, ean, description, specs, price } = req.body ?? {};

  if (!(title && category && ean && description && specs && price)) {
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
  const data = await getProductsJson();

  const newProduct = createNewProduct(body);

  data.push(newProduct);

  const success = await newProductsJson(data);

  if (success) {
    res.status(201).json(newProduct);
  } else {
    res.status(400).json({ message: `Error create Product` });
  }
};
