import { authSchema } from './features/auth/auth.schema';
import { productsSchema } from './features/products/products.schema';

const baseSchema = `
type Query
type Mutation
type Subscription
`;

export const schema = [baseSchema, productsSchema, authSchema];
