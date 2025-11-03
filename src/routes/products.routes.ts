import express, { Router } from 'express';
import { get, getList, post } from '../controllers/products.controller';

const productsRouter: Router = express.Router();

productsRouter.get('/', getList);
productsRouter.get('/:id', get);
productsRouter.post('/', post);


export default productsRouter;
