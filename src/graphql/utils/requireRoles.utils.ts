import { GraphQLError } from 'graphql/error';
import { GraphQlContext } from '../types/graphqlContext.type';
import { Role } from '../../types/role';

export const requireRoles = (ctx: GraphQlContext, roles: Role[]) => {
  if (!ctx.user || !roles.includes(ctx.user.role)) {
    throw new GraphQLError('Role unauthorized', {
      extensions: {
        code: 'Unauthorized',
        http: { status: 401 },
      },
    });
  }
};
