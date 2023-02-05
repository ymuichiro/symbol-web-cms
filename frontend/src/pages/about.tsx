/*

  Symbol関連の情報のうち、公的な情報の取り扱いページ（インデックス側のページ）

*/
import { PageTitle } from '@/components/atom/Titles';
import Footer from '@/components/moleculs/Footer';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MarkdownParser from '@/components/moleculs/MarkdownParser';
import Head from 'next/head';
import Header from '@/components/moleculs/Header';
import Toolbar from '@mui/material/Toolbar';
import { GetStaticProps, NextPage } from 'next/types';
import { lang, langSelecter } from '@/languages';

interface Props {
  i18n: lang['about'];
}

const About: NextPage<Props> = ({ i18n }) => {
  return (
    <>
      <Head>
        <title>{i18n.meta_page_title}</title>
        <meta name='description' content={i18n.meta_page_description} />
        <meta name='twitter:title' content={i18n.meta_page_title} />
        <meta name='twitter:description' content={i18n.meta_page_description} />
      </Head>
      <div style={{ marginBottom: '5vh' }}>
        <Container maxWidth='lg' style={{ height: '100%' }}>
          <Header />
          <Toolbar />
          <section>
            <Grid container spacing={1} style={{ height: '70vh' }}>
              <Grid item xs={12}>
                <div style={{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'center' }}>
                  <PageTitle style={{ textAlign: 'center' }}>{i18n.page_title}</PageTitle>
                  <Typography variant='body1' style={{ textAlign: 'center' }}>
                    {i18n.page_title_description}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </section>

          <Container maxWidth='md'>
            <MarkdownParser markdown={i18n.body_markdown} />
          </Container>
          <section style={{ marginTop: '20vh' }}>
            <Footer />
          </section>
        </Container>
      </div>
    </>
  );
};

// 各言語別に SSG する
const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  return {
    props: {
      i18n: langSelecter(locale).about,
    },
  };
};

export { getStaticProps };

export default About;
