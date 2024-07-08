import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import '@/styles/globals.css';

import { RootLayout } from '@/components/RootLayout';
import { Providers } from '@/components/Providers';
import { getLayout } from '@/lib/utils';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { pathname } = useRouter();
  const CurrentLayout = getLayout(pathname);
  return (
    <Providers session={session}>
      <RootLayout>
        <CurrentLayout>
          <Component {...pageProps} />
        </CurrentLayout>
      </RootLayout>
    </Providers>
  );
}
