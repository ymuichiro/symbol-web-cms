/*

  Symbol関連の情報のうち、公的な情報の取り扱いページ（インデックス側のページ）

*/
import MainBackground from '@/components/atom/MainBackground';
import { Select } from '@/components/atom/Select';
import { PageTitle } from '@/components/atom/Titles';
import { Toolbar } from '@/components/atom/Toolbar';
import Footer from '@/components/moleculs/Footer';
import Header from '@/components/moleculs/Header';
import MediaCard from '@/components/moleculs/MediaCard';
import { findNewsRelease, getHostingServerUrl, getImageUri } from '@/services/StrapiService';
import { NewsReleaseFindResponse } from '@/types/StrapiModel';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import news from '@/assets/icon/news.svg';
import { Helmet } from 'react-helmet-async';

const YEAR = ['2022年'];

function News(): JSX.Element {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'));
  const [year, setYear] = useState<string>(`${new Date().getFullYear().toString()}年`);
  const [release, setRelease] = useState<NewsReleaseFindResponse['data']>([]);
  const { t, i18n } = useTranslation(['news']);

  // ページの起動時にニュースを取得する
  useEffect(() => {
    findNewsRelease(i18n.language, { isIncludeMedia: true })
      .then((e) => setRelease([...e.data]))
      .catch(console.error);
  }, [i18n.language]);

  return (
    <>
      <Helmet>
        <title>{`${import.meta.env.VITE_SITE_NAME}: News`}</title>
      </Helmet>

      <div style={{ marginBottom: '5vh' }}>
        <Container maxWidth='lg' style={{ height: '100%' }}>
          <Header />
          <MainBackground />
          <Toolbar />
          <section>
            <Grid container spacing={1} style={{ height: '70vh' }}>
              <Grid item xs={12} sm={12} md={1}></Grid>
              <Grid item xs={12} sm={12} md={6}>
                <div style={{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'center' }}>
                  <PageTitle style={{ textAlign: matches ? 'center' : 'left' }}>{t('news:page_title')}</PageTitle>
                  <Typography variant='body1' style={{ textAlign: matches ? 'center' : 'left' }}>
                    {t('news:page_title_description')}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={news} alt='news page icon' style={{ width: '80%', maxWidth: '300px' }} />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={1}></Grid>
            </Grid>
          </section>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Select
              variant='standard'
              id='year'
              state={year}
              setState={setYear}
              data={YEAR.map((e) => ({ key: e, value: e }))}
              style={{
                fontSize: '2rem',
              }}
            />
          </div>
          <Grid container spacing={5} style={{ marginTop: '5vh' }}>
            {release.length === 0 && (
              <Grid item xs={12}>
                <Typography align='left'>{t('news:no_articles')}</Typography>
              </Grid>
            )}
            {release.map((item, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <MediaCard
                  title={item.attributes.title}
                  description={item.attributes.description}
                  date={item.attributes.publishedAt}
                  image={getImageUri(item.attributes.headerImage?.data.attributes.url)}
                  tweetLink={getHostingServerUrl(undefined, 'news', item.id.toString())}
                  link={`/news/${item.id}`}
                  style={{ height: '100%' }}
                />
              </Grid>
            ))}
          </Grid>
          <section style={{ marginTop: '10vh' }}>
            <Footer />
          </section>
        </Container>
      </div>
    </>
  );
}

export default News;
