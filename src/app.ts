import express from 'express';
import { notFound } from './middlewares';
import routes from './routes';
import health from './routes/health';

const app = express();
app.use(health);

app.use('/api/v1', routes);

app.use(notFound);

export default app;
