import { UsersProvider } from '@/lib/store/UsersContext';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@/lib/apolloClient';
import type { Session } from 'next-auth';

interface ProvidersProps {
  children: React.ReactNode;
  session: Session | null;
}

const InnerProviders = ({ children }: { children: React.ReactNode }) => {
  const client = useApollo();
  return (
    <ApolloProvider client={client}>
      <ThemeProvider
        enableSystem
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
      >
        <UsersProvider>{children}</UsersProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export const Providers = ({ children, session }: ProvidersProps) => {
  const error = console.error;

  // This code intercepts Recharts warnings related to defaultProps.
  // More information can be found in the GitHub issue: https://github.com/recharts/recharts/issues/3615
  // By intercepting these warnings, we prevent them from being printed to the console, reducing noise.
  // This is a temporary workaround until the issue is resolved in the Recharts library.

  // biome-ignore lint/suspicious/noExplicitAny: Recharts issue
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  return (
    <SessionProvider session={session}>
      <InnerProviders>{children}</InnerProviders>
    </SessionProvider>
  );
};
