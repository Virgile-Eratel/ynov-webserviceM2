import express, { Router } from 'express';
import { get, getList, patch, post, put, remove } from '../controllers/products.controller';

const productsRouter: Router = express.Router();

productsRouter.get('/', getList);
productsRouter.get('/:id', get);
productsRouter.post('/', post);
productsRouter.put('/:id', put); //delete ancien
productsRouter.patch('/:id', patch); // garde ancien
productsRouter.delete('/:id', remove);




export default productsRouter;
