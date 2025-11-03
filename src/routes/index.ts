import express, { Request, Response, Router } from 'express';
import productsRouter from './products.routes';

const router: Router = express.Router();

router.get('/', (_req: Request, res: Response) => res.json({ message: 'test' }));
router.use('/products',productsRouter);

export default router;
