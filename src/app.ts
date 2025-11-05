import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from '../swagger/options';
import { notFound } from './middlewares';
import pinoHttp from './middlewares/pinoHttp.middleware';
import routes from './routes';
import health from './routes/health';

const app = express();

const swaggerJsdoc = require('swagger-jsdoc');
const specs = swaggerJsdoc(swaggerOptions);

app.use(pinoHttp);
app.use(express.json({}));
app.use(health);

app.use('/api/v1', routes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(notFound);

export default app;
