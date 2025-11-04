import { Request, Response } from 'express';
import {
  createNewProduct,
  getProductFromId,
  getProductsJson,
  newProductsJson,
  removeProduct,
  saveProduct,
} from '../services/products.service';
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

export const patch = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, category, ean, description, specs, price } = req.body ?? {};

  const oldProduct = await getProductFromId(id);

  const newProduct: Product = {
    id: oldProduct.id,
    title: title ?? oldProduct.title,
    category: category ?? oldProduct.category,
    ean: ean ?? oldProduct.ean,
    description: description ?? oldProduct.description,
    specs: specs ?? oldProduct.specs,
    price: price ?? oldProduct.price,
  };

  const success = await saveProduct(newProduct);
  if (success) {
    res.status(201).json(newProduct);
  } else {
    res.status(400).json({ message: `Error patch Product` });
  }
};

export const put = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, category, ean, description, specs, price } = req.body ?? {};

  const oldProduct = await getProductFromId(id);

  const newProduct: Product = {
    id: oldProduct.id,
    title: title ?? "",
    category: category ?? "",
    ean: ean ?? "",
    description: description ?? "",
    specs: specs ?? "",
    price: price ?? null,
  };

  const success = await saveProduct(newProduct);
  if (success) {
    res.status(201).json(newProduct);
  } else {
    res.status(400).json({ message: `Error put Product` });
  }
};


export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

    const success = await removeProduct(id);
  if (success) {
    res.status(204).json();
  } else {
    res.status(400).json({ message: `Error put Product` });
  }

}