import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/languages/index';
import Root from '@/navigation/Root';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { theme } from './theme';
import { RecoilRoot } from 'recoil';
import { Helmet, HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet>
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@faunsu19000' />
        <meta name='twitter:title' content='Symbol Community' />
        <meta
          name='twitter:description'
          content='Next Generation Blockchain Symbol Web Site. Be the first to check the latest information. You can also get information about the active community.'
        />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_TRACKING_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${import.meta.env.VITE_GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
        <meta charSet='utf-8' />
        <title>{`${import.meta.env.VITE_SITE_NAME}`}</title>
        <meta name='theme-color' content='#01579b' />
        <meta
          name='description'
          content='Next Generation Blockchain Symbol Web Site. Be the first to check the latest information. You can also get information about the active community.'
        />
        <link rel='icon' href='/favicon.ico' />
        <link rel='apple-touch-icon' href='/icon-192x192.webp' />
        <link rel='manifest' href='/manifest.json' />
      </Helmet>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <CssBaseline>
            <Root />
          </CssBaseline>
        </RecoilRoot>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
