import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  type NormalizedCacheObject,
  from,
} from '@apollo/client';
import { useMemo } from 'react';
import type { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const createErrorLink = () =>
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      for (const { message, locations, path } of graphQLErrors) {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        );
      }
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

const createHttpLink = () =>
  new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL });

const createAuthLink = (session: Session | null) =>
  setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: session?.accessToken
        ? `Bearer ${session.accessToken}`
        : '',
    },
  }));

const createApolloClient = (session: Session | null) => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([createErrorLink(), createAuthLink(session), createHttpLink()]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: { fetchPolicy: 'cache-and-network' },
    },
  });
};

interface InitializeApolloOptions {
  initialState: NormalizedCacheObject | null;
  session: Session | null;
}

// biome-ignore format: off
export const initializeApollo = ({ initialState, session }: InitializeApolloOptions) => {
  const _apolloClient = apolloClient ?? createApolloClient(session);

  if (initialState) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  if (typeof window === 'undefined') return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

// biome-ignore format: off
export const useApollo = (initialState: NormalizedCacheObject | null = null) => {
  const { data: session } = useSession();
  console.log('session apollo', session?.accessToken);
  return useMemo(() => initializeApollo({initialState, session}), [initialState, session]);
};
