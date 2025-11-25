import { IServices } from "soap";
import { getListAllProduct } from "../../services/products.service";
import { SoapCallbackFunction } from "../types/SoapCallbackFunction";

export const productsService: IServices = {
  ProductsService: {
    ProductsServicePort: {
      ListProducts: async function (_: unknown, callback: SoapCallbackFunction) {
        const products = await getListAllProduct();
        !!callback && callback({products});
      }
    }
  }
};
