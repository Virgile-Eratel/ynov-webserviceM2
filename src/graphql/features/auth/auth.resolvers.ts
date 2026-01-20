import { GraphQLError } from 'graphql/error';
import { GraphQlContext } from '../../types/graphqlContext.type';

export const authResolvers = {
  Mutation: {
    login: async (_: any, args: { input: { email: string; password: string } }, ctx: GraphQlContext) => {
      const data = await ctx.services.auth.login(args.input.email, args.input.password);
      if (data.isAuthenticated && !!data.token) return { token: data.token, success: true };
      return new GraphQLError('Invalid credentials', {
        extensions: {
          code: 'Unauthorized',
          http: { status: 401 },
        },
      });
    },
    register: async (
      _: any,
      args: { input: { email: string; password: string; role: string } },
      ctx: GraphQlContext,
    ) => {
      const data = await ctx.services.auth.register(
        args.input.email,
        args.input.password,
        args.input.role as 'admin' | 'user',
      );
      if (data.token && data.user) return { token: data.token, user: data.user, success: true };
      return { success: false };
    },
  },
};
