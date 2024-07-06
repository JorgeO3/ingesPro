import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { getSession } from 'next-auth/react';
import type { Session } from 'next-auth';
import schema from '@/graphql/schema';

interface MyContext {
  user?: {
    id: string;
    role: string;
  };
}

const server = new ApolloServer<MyContext>({
  schema,
});

export default startServerAndCreateNextHandler(server, {
  context: async (req): Promise<MyContext> => {
    const session: Session | null = await getSession({ req });
    return {
      user: session?.user
        ? { id: session.user.id, role: session.user.role }
        : undefined,
    };
  },
});
