import { IServices } from 'soap';
import {
  getListAllProduct,
  getProductFromId,
  patchProduct,
  postProduct,
  putProduct,
  removeProduct,
} from '../../services/products.service';
import { Product } from '../../types';
import { SoapCallbackFunction } from '../types/SoapCallbackFunction';
import { verify } from '../../utils/jwt';

export const productsService: IServices = {
  ProductsService: {
    ProductsServicePort: {
      ListProducts: async function (_: unknown, callback: SoapCallbackFunction) {
        if (!callback) return;
        const products = await getListAllProduct();
        callback({ products });
      },
      GetProduct: async function ({ id }: { id: string }, callback: SoapCallbackFunction) {
        if (!callback) return;
        const product = await getProductFromId(id);
        if (product) {
          callback({ product });
        }
        return callback!({
          Fault: {
            faultcode: 'soap:Client',
            faultstring: `Product with id ${id} not found`,
            detail: {
              code: 404,
              message: `Product with id ${id} does not exist`,
            },
          },
        });
      },
      PutProduct: async function ({ id, ...rest }: { id: string }, callback: SoapCallbackFunction, headers: any) {
        if (!callback) return;

        // sécurité
        const token = headers?.AuthHeader?.token;
        try{
          verify(token)
        } catch {
          return callback({
            Fault: {
              faultcode: 'soap:Client',
              faultstring: `Invalid or expired token`,
              detail: {
                code: 401,
                message: `Invalid or expired token`,
              },
            },
          });
        }
        const oldProduct = await getProductFromId(id);
        if (!oldProduct) throw Error('Produit non trouvé');
        const { newProduct, success } = await putProduct(oldProduct.id, { ...oldProduct, ...rest });
        if (success) {
          callback({ newProduct });
        }
        return callback({
          Fault: {
            faultcode: 'soap:Client',
            faultstring: `Error put product with id ${id}`,
            detail: {
              code: 500,
              message: `Error put product with id ${id}`,
            },
          },
        });
      },
      PatchProduct: async function (
        { id, title, category, description, ean, specs, price },
        callback: SoapCallbackFunction,
        headers: any
      ) {
        if (!callback) return;

        // sécurité
        const token = headers?.AuthHeader?.token;
        try{
          verify(token)
        } catch {
          return callback({
            Fault: {
              faultcode: 'soap:Client',
              faultstring: `Invalid or expired token`,
              detail: {
                code: 401,
                message: `Invalid or expired token`,
              },
            },
          });
        }


        if (!(title && category && ean && specs && price !== undefined)) {
          throw Error('Error type Produit');
        }

        const oldProduct = await getProductFromId(id);
        if (!oldProduct) throw Error('Produit non trouvé');

        const { success, resultProduct } = await patchProduct( id,
          { id, title, category, description, ean, specs, price },
        );
        if (success) {
          callback({ resultProduct });
        }
        return callback({
          Fault: {
            faultcode: 'soap:Client',
            faultstring: `Error patch product with id ${id}`,
            detail: {
              code: 500,
              message: `Error patch product with id ${id}`,
            },
          },
        });
      },
      PostProduct: async function (
        { title, category, description, ean, specs, price },
        callback: SoapCallbackFunction,
        headers: any
      ) {
        if (!callback) return;
        // sécurité
        const token = headers?.AuthHeader?.token;
        try{
          verify(token)
        } catch {
          return callback({
            Fault: {
              faultcode: 'soap:Client',
              faultstring: `Invalid or expired token`,
              detail: {
                code: 401,
                message: `Invalid or expired token`,
              },
            },
          });
        }
        if (!(title && category && ean && specs && price !== undefined)) {
          throw Error('Error type Produit');
        }
        const body: Omit<Product, 'id'> = {
          title,
          category,
          ean,
          description,
          specs,
          price,
        };

        const { success, newProduct } = await postProduct(body);

        if (!success) {
          return callback({
          Fault: {
            faultcode: 'soap:Client',
            faultstring: `Error create product`,
            detail: {
              code: 500,
              message: `Error create product`,
            },
          },
        });
        }
        callback({ newProduct });
      },
      DeleteProduct: async function ({ id }: { id: string }, callback: SoapCallbackFunction, headers: any) {
        if (!callback) return;

        // sécurité
        const token = headers?.AuthHeader?.token;
        try{
          verify(token)
        } catch {
          return callback({
            Fault: {
              faultcode: 'soap:Client',
              faultstring: `Invalid or expired token`,
              detail: {
                code: 401,
                message: `Invalid or expired token`,
              },
            },
          });
        }
        const success = await removeProduct(id);
        if (success) {
          callback({ success });
        }
        return callback({
          Fault: {
            faultcode: 'soap:Client',
            faultstring: `Error delete product with id ${id}`,
            detail: {
              code: 500,
              message: `Error delete product with id ${id}`,
            },
          },
        });
      },
    },
  },
};
