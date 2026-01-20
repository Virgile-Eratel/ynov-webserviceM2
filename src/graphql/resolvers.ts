import { authResolvers } from "./features/auth/auth.resolvers";
import { productsResolvers } from "./features/products/products.resolvers";

export const resolvers = [productsResolvers, authResolvers];