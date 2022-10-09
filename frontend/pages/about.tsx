/*

  Symbol関連の情報のうち、公的な情報の取り扱いページ（インデックス側のページ）

*/
import type { NextPage } from 'next';
import { Toolbar } from '../components/atom/Toolbar';
import { PageTitle } from '../components/atom/Titles';
import { i18n, en, ja, ko } from '../i18n';
import Header from '../components/moleculs/Header';
import Footer from '../components/moleculs/Footer';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MarkdownParser from '../components/moleculs/MarkdownParser';

type Props = {
  i18nText: i18n;
};

const News: NextPage<Props> = ({ i18nText }) => {
  return (
    <div style={{ marginBottom: '5vh' }}>
      <Container maxWidth="lg" style={{ height: '100%' }}>
        <Header />
        <Toolbar />
        <section>
          <Grid container spacing={1} style={{ height: '70vh' }}>
            <Grid item xs={12}>
              <div style={{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'center' }}>
                <PageTitle style={{ textAlign: 'center' }}>{i18nText.about.page_title}</PageTitle>
                <Typography variant="body1" style={{ textAlign: 'center' }}>
                  {i18nText.about.page_title_description}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </section>

        <Container maxWidth="md">
          <MarkdownParser markdown={i18nText.about.body_markdown} />
        </Container>
        <section style={{ marginTop: '20vh' }}>
          <Footer />
        </section>
      </Container>
    </div>
  );
};

export function getStaticProps({ locale }: any) {
  let i18nText = en;
  
  switch(locale) {
    case 'en-Us':
      i18nText = en;
      break;
    case 'ja-JP':
      i18nText = ja;
      break;
    case 'ko-KR':
      i18nText = ko;
      break;
    default: en;
  }
  return { props: { i18nText } };
}

export default News;
