/*

  Symbol関連の情報のうち、公的な情報の取り扱いページ（インデックス側のページ）

*/
import { Toolbar } from '@/components/atom/Toolbar';
import { PageTitle } from '@/components/atom/Titles';
import Header from '@/components/moleculs/Header';
import Footer from '@/components/moleculs/Footer';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MarkdownParser from '@/components/moleculs/MarkdownParser';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

function About(): JSX.Element {
  const { t } = useTranslation(['about']);
  return (
    <>
      <Helmet>
        <title>{`${import.meta.env.VITE_SITE_NAME}`}: About Team</title>
      </Helmet>
      <div style={{ marginBottom: '5vh' }}>
        <Container maxWidth='lg' style={{ height: '100%' }}>
          <Header />
          <Toolbar />
          <section>
            <Grid container spacing={1} style={{ height: '70vh' }}>
              <Grid item xs={12}>
                <div style={{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'center' }}>
                  <PageTitle style={{ textAlign: 'center' }}>{t('about:page_title')}</PageTitle>
                  <Typography variant='body1' style={{ textAlign: 'center' }}>
                    {t('about:page_title_description')}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </section>

          <Container maxWidth='md'>
            <MarkdownParser markdown={t('about:body_markdown')} />
          </Container>
          <section style={{ marginTop: '20vh' }}>
            <Footer />
          </section>
        </Container>
      </div>
    </>
  );
}

export default About;
