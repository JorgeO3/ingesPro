import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { getServerSession } from 'next-auth';
import type { Session } from 'next-auth';
import schema from '@/apollo-server/schema';
import { authOptions } from './auth/[...nextauth]';

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
  context: async (req, res): Promise<MyContext> => {
    const session: Session | null = await getServerSession(
      req,
      res,
      authOptions,
    );

    return {
      user: session?.user
        ? { id: session.user.id, role: session.user.role }
        : undefined,
    };
  },
});
