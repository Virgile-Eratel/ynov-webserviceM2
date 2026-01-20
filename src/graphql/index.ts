import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { type Express, json } from 'express';
import { useServer } from 'graphql-ws/use/ws';
import { Server } from 'http';
import { WebSocketServer } from 'ws';
import { buildContext } from './context';
import { resolvers } from './resolvers';
import { schema } from './schema';
import { GraphQlContext } from './types/graphqlContext.type';
import { executableSchema } from './utils/executableScema';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

export const setupGraphQl = async (app: Express, server: Server) => {
  //Init server ws
  const wsServer = new WebSocketServer({
    server,
    path: '/graphql',
  });

  useServer(
    {
      schema: executableSchema,
      //Contexte pour les Subscriptions
      context: async (ctx: GraphQlContext) => buildContext(ctx.req),
    },
    wsServer,
  );

  const apollo = new ApolloServer<GraphQlContext>({
    typeDefs: schema,
    resolvers,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
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
