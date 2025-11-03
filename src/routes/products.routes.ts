import express, { Router } from 'express';
import { getListProducts } from '../controllers/products.controller';

const productsRouter: Router = express.Router();

productsRouter.get('/', getListProducts)


export default productsRouter;
