import { Request, Response } from 'express';
import * as ordersService from '../services/orders.service';
import { Order } from '../types/order';


export const post = async (req: Request, res: Response) => {
    const { userId, items } = req.body ?? {};

  try {

    const body: Omit<Order, 'id'> = {
        userId,
        items,
      };

    const {newOrder, success} = await ordersService.create(body)

    if (success) {
        res.status(201).json(newOrder);
      } else {
        res.status(500).json({ message: `Error create Order` });
      }  
  } catch (error){
    res.status(400).json({message: "Erreur création order"})
  }
  
};

export const getMyOrders = async (req: Request, res: Response) => {
  
  try {
    const user = (req as any).user;
    
    const orders = await ordersService.getMyOrders(user.id)
    res.status(200).json({orders});
  
  } catch (error){
    res.status(400).json({message: "Erreur récupération orders"})
  }
  
};

export const getById = async (req: Request, res: Response) => {
    const idParams = req.params.id;

  try {
    
  const order = await ordersService.getById(idParams)

  if (order){
      res.status(200).json({order});
  } else {
      res.status(404).json({message: "Order non trouvé"});
  }
  
  } catch (error){
    res.status(400).json({message: "Erreur récupération order"})
  }
  
};