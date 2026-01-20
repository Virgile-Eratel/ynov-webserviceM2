import { productsSchema } from './features/products/products.schema';

const baseSchema = `
type Query
type Mutation
`;

export const schema = [baseSchema, productsSchema];
