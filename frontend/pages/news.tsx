/*

  Symbol関連の情報のうち、公的な情報の取り扱いページ（インデックス側のページ）

*/
import type { NextPage } from 'next';
import { Toolbar } from '../components/atom/Toolbar';
import { Select } from '../components/atom/Select';
import { useEffect, useState } from 'react';
import { PageTitle } from '../components/atom/Titles';
import { NewsReleaseFindResponse } from '../model/StrapiModel';
import { useRouter } from 'next/router';
import { i18n, en, ja } from '../i18n';
import Header from '../components/moleculs/Header';
import Footer from '../components/moleculs/Footer';
import Container from '@mui/material/Container';
import strapi from '../service/StrapiService';
import MediaCard from '../components/moleculs/MediaCard';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MainBackground from '../components/atom/MainBackground';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const YEAR = ['2022年'];
type Props = {
  i18nText: i18n;
};

const News: NextPage<Props> = ({ i18nText }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'));
  const [year, setYear] = useState<string>(`${new Date().getFullYear().toString()}年`);
  const [release, setRelease] = useState<NewsReleaseFindResponse['data']>([]);
  const router = useRouter();

  // ページの起動時にニュースを取得する
  useEffect(() => {
    if (typeof window === 'object' && router.isReady) {
      strapi.findNewsRelease(router.locale, { isIncludeMedia: true }).then((e) => {
        setRelease([...e.data]);
      });
    }
  }, [router.query]);

  return (
    <div style={{ marginBottom: '5vh' }}>
      <Container maxWidth="lg" style={{ height: '100%' }}>
        <Header />
        <MainBackground />
        <Toolbar />
        <section>
          <Grid container spacing={1} style={{ height: '70vh' }}>
            <Grid item xs={12} sm={12} md={1}></Grid>
            <Grid item xs={12} sm={12} md={6}>
              <div style={{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'center' }}>
                <PageTitle style={{ textAlign: matches ? 'center' : 'left' }}>{i18nText.news.page_title}</PageTitle>
                <Typography variant="body1" style={{ textAlign: matches ? 'center' : 'left' }}>
                  {i18nText.news.page_title_description}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <img
                  src="/assets/img/reshot-icon-news-WGPYLFJTQ8.svg"
                  alt="reshot icon"
                  style={{ maxWidth: '300px' }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={1}></Grid>
          </Grid>
        </section>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Select
            variant="standard"
            id="year"
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
              <Typography align="left">{i18nText.news.no_articles}</Typography>
            </Grid>
          )}
          {release.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <MediaCard
                title={item.attributes.title}
                description={item.attributes.description}
                date={item.attributes.publishedAt}
                tweetLink={`${process.env.NEXT_PUBLIC_NEXT_SERVER_URL}/news/${item.id}`}
                link={{ pathname: `/news/${item.id}` }}
                image={strapi.getImageUri(item.attributes.headerImage?.data.attributes.url)}
              />
            </Grid>
          ))}
        </Grid>
        <section style={{ marginTop: '10vh' }}>
          <Footer />
        </section>
      </Container>
    </div>
  );
};

export function getStaticProps({ locale }: any) {
  const i18nText = locale === 'en-US' ? en : ja;
  return { props: { i18nText } };
}

export default News;
