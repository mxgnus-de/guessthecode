import GlobalStyles from 'components/styles';
import type { AppProps } from 'next/app';
import '../style/fonts.css';
import { SessionProvider } from 'next-auth/react';

function GuessTheCode({
   Component,
   pageProps: { session, ...pageProps },
}: AppProps) {
   return (
      <>
         <GlobalStyles />
         <SessionProvider session={session}>
            <Component {...pageProps} />
         </SessionProvider>
      </>
   );
}

export default GuessTheCode;
