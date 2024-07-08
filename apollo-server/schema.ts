import typeDefs from '@/apollo-server/typeDefs';
import resolvers from '@/apollo-server/resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
