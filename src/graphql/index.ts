import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { type Express, json } from 'express';
import { buildContext } from './context';
import { resolvers } from './resolvers';
import { schema } from './schema';
import { GraphQlContext } from './types/graphqlContext.type';


export const setupGraphQl = async (app: Express) => {
  const apollo = new ApolloServer<GraphQlContext>({
    typeDefs: schema,
    resolvers,
  });
  await apollo.start();

  app.use(
    '/graphql',
    json(),
    expressMiddleware<GraphQlContext>(apollo, {
      context: async ({ req }) => buildContext(req),
    }),
  );
};
