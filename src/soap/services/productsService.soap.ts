import { IServices } from 'soap';
import { getListAllProduct, getProductFromId, patchProduct, postProduct, putProduct } from '../../services/products.service';
import { SoapCallbackFunction } from '../types/SoapCallbackFunction';
import { Product } from '../../types';

export const productsService: IServices = {
  ProductsService: {
    ProductsServicePort: {
      ListProducts: async function (_: unknown, callback: SoapCallbackFunction) {
        const products = await getListAllProduct();
        !!callback && callback({ products });
      },
      GetProduct: async function ({ id }: { id: string }, callback: SoapCallbackFunction) {
        const product = await getProductFromId(Number(id));
        !!callback && callback({ product });
      },
      PutProduct: async function ({ id, ...rest }: { id: string }, callback: SoapCallbackFunction) {
        const oldProduct = await getProductFromId(Number(id));
        if (!oldProduct) throw Error('Produit non trouvé');
        const { newProduct } = await putProduct({ ...oldProduct, ...rest }, oldProduct.id);
        !!callback && callback({ newProduct });
      },
      PatchProduct: async function ({ id, title, category, description, ean, specs, price }, callback: SoapCallbackFunction) {
        if (!(title && category && ean && specs && price !== undefined)) {
          throw Error('Error type Produit');
        }


        const oldProduct = await getProductFromId(Number(id));
        if (!oldProduct) throw Error('Produit non trouvé');

        /* TODO a finir voir pour afficher le résultat il n'est pas affiché */
        const { newProduct } = await patchProduct({ id, title, category, description, ean, specs, price }, oldProduct);
        !!callback && callback({ newProduct });
      },
      PostProduct: async function ({ title, category, description, ean, specs, price }, callback: SoapCallbackFunction) {
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
          
        if (!success) throw Error('Error create Produit'); 
        !!callback && callback({ newProduct });
      },
    },
  },
};
