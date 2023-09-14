import type { AppProps } from 'next/app';
import '@/styles/style.scss';
import { Providers } from '@/pageSections/Providers';
import { NextIntlClientProvider } from 'next-intl';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextIntlClientProvider messages={pageProps.messages}>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </NextIntlClientProvider>
  );
}
