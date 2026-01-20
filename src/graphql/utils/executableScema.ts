import { makeExecutableSchema } from "@graphql-tools/schema";
import {schema} from '../schema'
import {resolvers} from '../resolvers'


export const executableSchema = makeExecutableSchema({
  typeDefs : schema,
  resolvers
})