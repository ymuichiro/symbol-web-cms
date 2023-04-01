import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';
import openapi from '@/assets/json/openapi.json';
import Head from 'next/head';
import { lang, langSelecter } from '@/languages';
import Toolbar from '@mui/material/Toolbar';
import MainBackground from '@/components/atom/MainBackground';
import Container from '@mui/material/Container';
import Header from '@/components/moleculs/Header';

const SwaggerUI = dynamic(import('swagger-ui-react'), { ssr: false });

interface Props {
  i18n: lang['index'];
  spec: Record<string, any>;
}

function Rest({ spec, i18n }: Props): JSX.Element {
  return (
    <>
      <Head>
        <title>{i18n.meta_page_title}</title>
        <meta name='description' content={i18n.meta_page_description} />
        <meta name='twitter:title' content={i18n.meta_page_title} />
        <meta name='twitter:description' content={i18n.meta_page_description} />
      </Head>
      <Header />
      <Toolbar style={{ marginTop: '20px' }} />
      <div style={{ marginBottom: '5vh' }}>
        <Container maxWidth='lg'>
          <MainBackground />
          <div style={{ backgroundColor: 'white', maxWidth: '100%', borderRadius: '8px' }}>
            <SwaggerUI spec={spec} />
          </div>
        </Container>
      </div>
    </>
  );
}

export async function getStaticProps(ctx: GetStaticPropsContext): Promise<GetStaticPropsResult<Props>> {
  const spec: Record<string, any> = createSwaggerSpec({ definition: openapi });

  return {
    props: {
      i18n: langSelecter(ctx.locale).index,
      spec,
    },
  };
}

export default Rest;
