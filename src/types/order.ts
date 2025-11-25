import { OrderItem } from "./orderItem";

export interface Order {
    id: string,
    userId: string,
    items: OrderItem[],
}