import express, { Request, Response } from 'express';
import { notFound } from './middlewares';
import health from './routes/health';

const app = express();
const router = express.Router();

router.get('/', (_req: Request, res: Response) => res.send('Hello World'));

app.use(health);
app.use(router);
app.use(notFound);

export default app;
