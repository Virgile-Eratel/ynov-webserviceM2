import { GraphQLError } from 'graphql/error';
import { GraphQlContext } from '../types/graphqlContext.type';

export const requireAuth = (ctx: GraphQlContext) => {
  if (!ctx.user) {
    throw new GraphQLError('Not logged', {
      extensions: {
        code: 'Unauthorized',
        http: { status: 401 },
      },
    });
  }
};
