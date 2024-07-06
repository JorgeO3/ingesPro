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

function createApolloClient(session: Session | null) {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      for (const { message, locations, path } of graphQLErrors) {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        );
      }
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const httpLink = new HttpLink({
    uri: 'http://localhost:3000/api/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: session?.user ? `Bearer ${session.user.id}` : '',
      },
    };
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });
}

// biome-ignore format: off
// biome-ignore lint/style/useDefaultParameterLast: <explanation>
export function initializeApollo(initialState: NormalizedCacheObject | null = null, session: Session | null) {
  const _apolloClient = apolloClient ?? createApolloClient(session);

  if (initialState) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  if (typeof window === 'undefined') return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: NormalizedCacheObject | null = null) {
  const { data: session } = useSession();
  const store = useMemo(
    () => initializeApollo(initialState, session),
    [initialState, session],
  );
  return store;
}
