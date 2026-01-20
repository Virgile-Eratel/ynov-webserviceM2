import cors, { CorsOptions } from 'cors';
import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from '../swagger/options';
import limiter from './middlewares/limiter.middleware';
import pinoHttp from './middlewares/pinoHttp.middleware';
import routes from './routes';
import health from './routes/health';

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
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'https://embeddable-sandbox.cdn.apollographql.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://embeddable-sandbox.cdn.apollographql.com'],
        imgSrc: ["'self'", 'data:', 'https://embeddable-sandbox.cdn.apollographql.com'],
        connectSrc: ["'self'", 'https://*.apollographql.com'],
        frameSrc: ["'self'", 'https://sandbox.embed.apollographql.com'],
      },
    },
  })
);
app.use(cors(corsOptions));

//log
app.use(pinoHttp);

app.use(express.json({}));
app.use(health);

app.use('/api/v1', routes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

export default app;
