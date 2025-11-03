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
  const title = req.body.title;
  const category = req.body.category;
  const ean = req.body.ean;
  const description = req.body.description;
  const specs = req.body.specs;
  const price = Number(req.body.price);

  const body: Omit<Product, 'id'> = {
    title: title,
    category: category,
    ean: ean,
    description: description,
    specs: specs,
    price: price,
  };
  const data = await getProductsJson();

  const newProduct = createNewProduct(data, body);

    data.push(newProduct);

    const success = await newProductsJson(data);

    if (success) {
      res.status(201).json(newProduct);
    } else {
      res.status(400).json({ message: `Error create Product` });
    }
  
};
