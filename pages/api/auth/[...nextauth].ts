import NextAuth, { type NextAuthOptions } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import Auth0Provider from 'next-auth/providers/auth0';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (user) {
        token.role = user.role;
      }

      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.sub ?? '',
        role: token.role as string,
      };
      session.accessToken = token.accessToken as string;
      return session;
    },
    async redirect() {
      return process.env.NEXT_PUBLIC_REDIRECT_URL as string;
    },
  },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  debug: true,
};

export default NextAuth(authOptions);
