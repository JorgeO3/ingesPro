import typeDefs from '@/graphql/typeDefs';
import resolvers from '@/graphql/resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
