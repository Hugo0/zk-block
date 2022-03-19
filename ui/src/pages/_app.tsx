import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import Providers from '../utils/Providers';

import themes from '../themes';
import '../styles/global.css';
import { analytics } from '@firebase/firebase-config';

const MyApp = ({ Component, pageProps }: AppProps) => {
  if (process.env.NEXT_PUBLIC_ENV === 'prod') {
    console.log = function () {};
  }

  React.useEffect(() => {
    analytics();
  }, []);

  return (
    <Providers>
      <ThemeProvider theme={themes()}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Providers>
  );
};
export default MyApp;
