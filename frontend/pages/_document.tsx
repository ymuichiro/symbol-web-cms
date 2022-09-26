import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@mui/styles';
import { GA_TRACKING_ID } from '../service/gtag';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#01579b" />
          <meta
            name="description"
            content="Next Generation Blockchain Symbol Web Site. Be the first to check the latest information. You can also get information about the active community."
          />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/icon-192x192.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@faunsu19000" />
          <meta name="twitter:title" content="Symbol Community" />
          <meta
            name="twitter:description"
            content="Next Generation Blockchain Symbol Web Site. Be the first to check the latest information. You can also get information about the active community."
          />
          <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_NEXT_SERVER_URL}/twitter_card.png`} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};
