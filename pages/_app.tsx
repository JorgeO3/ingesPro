import { Providers } from '@/components/Providers';
import { RootLayout } from '@/components/RootLayout';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { getLayout } from '@/lib/utils';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const CurrentLayout = getLayout(pathname);
  return (
    <Providers>
      <RootLayout>
        <CurrentLayout>
          <Component {...pageProps} />
        </CurrentLayout>
      </RootLayout>
    </Providers>
  );
}
