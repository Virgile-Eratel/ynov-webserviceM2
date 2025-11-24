import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from '../swagger/options';
import { notFound } from './middlewares';
import pinoHttp from './middlewares/pinoHttp.middleware';
import routes from './routes';
import health from './routes/health';
import limiter from './middlewares/limiter.middleware';
import helmet from 'helmet';
import cors from 'cors';
import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = express();

const swaggerJsdoc = require('swagger-jsdoc');
const specs = swaggerJsdoc(swaggerOptions);

//sécurité
app.use(limiter);
app.use(helmet());
app.use(cors(corsOptions));

//log
app.use(pinoHttp);

app.use(express.json({}));
app.use(health);

app.use('/api/v1', routes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(notFound);

export default app;
