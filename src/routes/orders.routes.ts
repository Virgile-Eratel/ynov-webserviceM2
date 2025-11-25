import express, { Router } from 'express';
import * as ordersController from '../controllers/orders.controller';
import { auth } from '../middlewares/auth.middleware';

const ordersRouter: Router = express.Router();

ordersRouter.post('/', auth, ordersController.post);
ordersRouter.get('/me', auth, ordersController.getMyOrders);
ordersRouter.get('/:id', auth, ordersController.getById);


export default ordersRouter;
