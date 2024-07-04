import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div
      className={cn(
        'bg-background font-sans antialiased flex h-screen',
        inter.variable,
      )}
    >
      {children}
    </div>
  );
};
