import express, { Router } from 'express';
import { get, getList } from '../controllers/products.controller';

const productsRouter: Router = express.Router();

productsRouter.get('/', getList);
productsRouter.get('/:id', get);

export default productsRouter;
