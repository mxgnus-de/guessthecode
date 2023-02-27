import GlobalStyles from 'components/styles';
import type { AppProps } from 'next/app';
import '../style/fonts.css';

function GuessTheCode({ Component, pageProps }: AppProps) {
   return (
      <>
         <GlobalStyles />
         <Component {...pageProps} />
      </>
   );
}

export default GuessTheCode;
