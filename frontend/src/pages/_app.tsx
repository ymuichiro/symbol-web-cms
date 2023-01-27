import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '@/components/moleculs/Header';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '@/services/theme';
import createEmotionCache from '@/services/createEmotionCache';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import Toolbar from '@mui/material/Toolbar';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

if (
  !process.env.NEXT_PUBLIC_API_URL ||
  !process.env.NEXT_PUBLIC_HOSTING_URL ||
  !process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
  !process.env.NEXT_PUBLIC_SITE_NAME ||
  !process.env.NEXT_PUBLIC_SITE_DESCRIPTION
) {
  throw new Error('Environment variable is not set');
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <GoogleAnalytics trackPageViews gaMeasurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
        <meta name='description' content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION} />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@faunsu19000' />
        <meta name='twitter:image' content='/twitter-card.png' />
        <meta name='twitter:title' content={process.env.NEXT_PUBLIC_SITE_NAME} />
        <meta name='twitter:description' content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION} />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
