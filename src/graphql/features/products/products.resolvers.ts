import { Product } from '../../../types';
import { GraphQlContext } from '../../types/graphqlContext.type';
import { requireAuth } from '../../utils/requireAuth.utils';

export const productsResolvers = {
  Query: {
    products: (_: any, _args: any, ctx: GraphQlContext) => ctx.services.products.getListProduct(),
    product: (_: any, args: { id: string }, ctx: GraphQlContext) => ctx.services.products.getProductFromId(args.id),
  },
  Mutation: {
    createProduct: async (_: any, args: { input: Omit<Product, 'id'> }, ctx: GraphQlContext) => {
      requireAuth(ctx);

      const data = await ctx.services.products.postProduct(args.input);
      if (data.success) return { product: data.newProduct, success: data.success };
      return { success: data.success };
    },
    updateProduct: async (_: any, args: { id: string; input: Product }, ctx: GraphQlContext) => {
      requireAuth(ctx);

      const data = await ctx.services.products.patchProduct(args.id, args.input);
      if (data.success) return { product: data.resultProduct, success: data.success };
      return { success: data.success };
    },
    deleteProduct: async (_: any, args: { id: string }, ctx: GraphQlContext) => {
      requireAuth(ctx);

      const data = await ctx.services.products.removeProduct(args.id);
      return { success: data };
    },
  },
};
