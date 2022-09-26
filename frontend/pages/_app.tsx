import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import * as gtag from '../service/gtag';
import { elementType, object } from 'prop-types';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { theme } from '../styles/theme';
import { ContextProvider } from '../context';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // setup google analytics
  React.useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // setup mui-material & service worker
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js');
      });
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Symbol Community</title>
      </Head>
      <StyledEngineProvider injectFirst>
        <ContextProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline>
              <Component {...pageProps} />
            </CssBaseline>
          </ThemeProvider>
        </ContextProvider>
      </StyledEngineProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: elementType.isRequired,
  pageProps: object.isRequired,
};

export default MyApp;
