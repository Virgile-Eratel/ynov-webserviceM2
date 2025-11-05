import request, { Response } from 'supertest';
import app from '../src/app';
import { postProduct, removeProduct } from '../src/services/products.service';
import { Product } from '../src/types';

require('dotenv').config();

describe('Products API', () => {
  const data = {
    title: 'Test cool',
    category: 'category',
    ean: 'ean',
    description: 'description',
    specs: 'specs',
    price: 1.99,
  };
  const missingData = {
    title: 'Test cool 1',
  };
  let productId: number | undefined;

  beforeEach(async () => {
    const { success, newProduct } = await postProduct(data);
    if (success) {
      productId = newProduct?.id;
      console.log('Création du produit test:', productId);
    }
  });
  afterEach(async () => {
    if (productId) {
      await removeProduct(productId);
      console.log('Suppression du produit test:', productId);
    }
  });

  describe('GET /products', () => {
    it('should fetch all products', async () => {
      return request(app)
        .get('/api/v1/products')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res: Response) => {
          expect(res.statusCode).toBe(200);
        });
    });
    it('should fetch all products whith filter', async () => {
      return request(app)
        .get(`/api/v1/products?s=${data.title}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res: Response) => {
          expect(res.statusCode).toBe(200);
          const arrayBody = res.body as Array<Product>;
          const numberFind = arrayBody.find((p) => p.title === data.title);
          expect(numberFind).toBeDefined();
        });
    });
    describe('GET /products avec pagination', () => {
      const arrayIdToDelete: number[] = [];

      beforeEach(async () => {
        for (let index = 0; index < 20; index++) {
          const { newProduct } = await postProduct(data);
          if (newProduct) arrayIdToDelete.push(newProduct.id);
        }
      });
      afterEach(async () => {
        for (const id of arrayIdToDelete) {
          await removeProduct(id);
        }
      });

      it('should fetch all products whith pagination', async () => {
        return request(app)
          .get('/api/v1/products?page=1&limit=1')
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res: Response) => {
            expect(res.statusCode).toBe(200);
            const arrayBody = res.body as Array<Product>;
            expect(arrayBody.length).toEqual(1);
          });
      });
      it('should fetch all products whith pagination 20', async () => {
        return request(app)
          .get('/api/v1/products?page=1&limit=20')
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res: Response) => {
            expect(res.statusCode).toBe(200);
            const arrayBody = res.body as Array<Product>;
            expect(arrayBody.length).toEqual(20);
          });
      });
    });
  });
  describe('GET /products/:id', () => {
    it('should fetch one product', async () => {
      return request(app)
        .get(`/api/v1/products/${productId}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res: Response) => {
          expect(res.statusCode).toBe(200);
        });
    });
    it('should return 404 on get on product who dose not exist', async () => {
      return request(app)
        .get(`/api/v1/products/${productId && productId + 1}`)
        .expect(404)
        .expect('Content-Type', /json/)
        .then((res: Response) => {
          expect(res.statusCode).toBe(404);
        });
    });
  });
  describe('POST /products/', () => {
    it('should create one product', async () => {
      return request(app)
        .post('/api/v1/products')
        .send(data)
        .expect(201)
        .expect('Content-Type', /json/)
        .then(async (res: Response) => {
          expect(res.statusCode).toBe(201);
          if (res.body.id) {
            await removeProduct(res.body.id);
            console.log('Suppression du produit créé:', res.body.id);
          }
        });
    });
    it('should return error on create not complete type required', async () => {
      return request(app)
        .post(`/api/v1/products`)
        .send(missingData)
        .expect(400)
        .expect('Content-Type', /json/)
        .then((res: Response) => {
          expect(res.statusCode).toBe(400);
        });
    });
  });
  describe('PUT /products/:id', () => {
    it('should put one product', async () => {
      return request(app)
        .put(`/api/v1/products/${productId}`)
        .send(data)
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res: Response) => {
          expect(res.statusCode).toBe(200);
        });
    });
    it('should return error on put not complete type required', async () => {
      return request(app)
        .put(`/api/v1/products/${productId}`)
        .send(missingData)
        .expect(400)
        .expect('Content-Type', /json/)
        .then((res: Response) => {
          expect(res.statusCode).toBe(400);
        });
    });
    it('should return error on put one product who dose not exist', async () => {
      return request(app)
        .put(`/api/v1/products/${productId && productId + 1}`)
        .send(data)
        .expect(404)
        .expect('Content-Type', /json/)
        .then((res: Response) => {
          expect(res.statusCode).toBe(404);
        });
    });
  });
  describe('PATCH /products/:id', () => {
    it('should patch one product', async () => {
      return request(app)
        .patch(`/api/v1/products/${productId}`)
        .send(data)
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res: Response) => {
          expect(res.statusCode).toBe(200);
        });
    });
    it('should return error on patch not complete type required', async () => {
      return request(app)
        .patch(`/api/v1/products/${productId}`)
        .send(missingData)
        .expect(400)
        .expect('Content-Type', /json/)
        .then((res: Response) => {
          expect(res.statusCode).toBe(400);
        });
    });
    it('should return error on patch one product who dose not exist', async () => {
      return request(app)
        .patch(`/api/v1/products/${productId && productId + 1}`)
        .send(data)
        .expect(404)
        .expect('Content-Type', /json/)
        .then((res: Response) => {
          expect(res.statusCode).toBe(404);
        });
    });
  });
  describe('DELETE /products/:id', () => {
    it('should delete one product', async () => {
      return request(app)
        .delete(`/api/v1/products/${productId}`)
        .send(data)
        .expect(204)
        .then((res: Response) => {
          expect(res.statusCode).toBe(204);
        });
    });
    it('should return error on delete one product who dose not exist', async () => {
      return request(app)
        .delete(`/api/v1/products/${productId && productId + 1}`)
        .send(data)
        .expect(500)
        .then((res: Response) => {
          expect(res.statusCode).toBe(500);
        });
    });
  });
});
