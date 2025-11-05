import express, { Router } from 'express';
import productsRouter from './products.routes';
import authRouter from './auth.routes'

const router: Router = express.Router();

router.use('/auth', authRouter)
router.use('/products',productsRouter);

export default router;
