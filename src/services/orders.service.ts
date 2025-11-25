import path from 'path';
import { Order } from '../types/order';
import { FILE_JSON_ORDERS } from '../utils/constants';
import { parseJsonFile, writeJsonFile } from '../utils/utils';
import { getProductsJson } from './products.service';

export const getOrdersJson = async () => {
  return await parseJsonFile<Order[]>(path.resolve(FILE_JSON_ORDERS));
};

export const newOrdersJson = async (data: Order[]) => {
  return await writeJsonFile(path.resolve(FILE_JSON_ORDERS), data);
};

export const createNewOrder = (order: Omit<Order, 'id'>): Order => {
  return {
    id: `id-order-${order.userId}-${Date.now()}`,
    ...order,
  };
};

export const create = async (body: Omit<Order, 'id'>) => {
  const data = await getOrdersJson();

  const dataProducts = await getProductsJson();
  
  //vérification produits existe
  body.items.map((item) => {
    const a = dataProducts.map((product) => product.id)
    if(!a.includes(item.productId)){
      throw Error("Product id not Found")
    }
  })

  const newOrder = createNewOrder(body);

  data.push(newOrder);

  const resultSaveOrder = await newOrdersJson(data);
  if (resultSaveOrder) {
    return { success: true, newOrder };
  }
  return { success: false };
};

export const getMyOrders = async (userId: string) => {
  let data = await getOrdersJson();

  return data.filter((order) => (
    order.userId === userId
  ));
};

export const getById = async (id: string): Promise<Order | undefined> => {
  return (await getOrdersJson()).filter((order) => order.id === id)[0];
};