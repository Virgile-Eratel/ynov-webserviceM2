import { Product } from '../../../types';
import { RoleEnum } from '../../../types/role';
import { TOPICS } from '../../constants/topics.constant';
import { pubsub } from '../../pubsub';
import { GraphQlContext } from '../../types/graphqlContext.type';
import { requireRoles } from '../../utils/requireRoles.utils';

export const productsResolvers = {
  Query: {
    products: (_: any, _args: any, ctx: GraphQlContext) => ctx.services.products.getListProduct(),
    product: (_: any, args: { id: string }, ctx: GraphQlContext) => ctx.services.products.getProductFromId(args.id),
  },
  Mutation: {
    createProduct: async (_: any, args: { input: Omit<Product, 'id'> }, ctx: GraphQlContext) => {
      requireRoles(ctx, [RoleEnum.admin]);

      const data = await ctx.services.products.postProduct(args.input);
      if (data.success) {
        //Notifier les abonnés de la ws
        pubsub.publish(TOPICS.PRODUCT_CREATED, { productCreated: data.newProduct });

        return { product: data.newProduct, success: data.success };
      }
      return { success: data.success };
    },
    updateProduct: async (_: any, args: { id: string; input: Product }, ctx: GraphQlContext) => {
      requireRoles(ctx, [RoleEnum.admin]);

      const data = await ctx.services.products.patchProduct(args.id, args.input);
      if (data.success) {
        pubsub.publish(TOPICS.PRODUCT_UPDATED, { productUpdated: data.resultProduct });
        return { product: data.resultProduct, success: data.success };
      }
      return { success: data.success };
    },
    deleteProduct: async (_: any, args: { id: string }, ctx: GraphQlContext) => {
      requireRoles(ctx, [RoleEnum.admin]);

      const data = await ctx.services.products.removeProduct(args.id);
      pubsub.publish(TOPICS.PRODUCT_DELETED, { productDeleted: { id: args.id, success: data } });
      return { success: data };
    },
  },
  Subscription: {
    productCreated: {
      subscribe: () => pubsub.asyncIterableIterator([TOPICS.PRODUCT_CREATED]),
    },
    productUpdated: {
      subscribe: () => pubsub.asyncIterableIterator([TOPICS.PRODUCT_UPDATED]),
    },
    productDeleted: {
      subscribe: () => pubsub.asyncIterableIterator([TOPICS.PRODUCT_DELETED]),
    },
  },
};
