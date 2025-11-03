import express, { Request, Response } from 'express';
import { notFound } from './middleware/notFound';

const app = express();
const router = express.Router();

router.get('/', (_req: Request, res: Response) => res.send('Hello World'));

app.use(router);
app.use(notFound);

export default app;
