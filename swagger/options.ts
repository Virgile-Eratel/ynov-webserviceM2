import { ProductSchema, ProductSchemaNew } from './components/schemas/product.schema';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'API RESTful en TypeScript',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: "JWT nécessaire dans l'en tête Authorization: Bearer <token>",
        },
      },
      schemas: {
        ...ProductSchema,
        ...ProductSchemaNew,
      },
    },
  },
  apis: ['./src/**/*.ts'],
};

export default swaggerOptions;
