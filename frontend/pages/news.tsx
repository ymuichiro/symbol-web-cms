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
import { useTranslation } from 'next-export-i18n';
import { isLanguageByQuery } from '../i18n/isLanguageByQuery';
import Header from '../components/moleculs/Header';
import Footer from '../components/moleculs/Footer';
import Container from '@mui/material/Container';
import strapi from '../service/StrapiService';
import MediaCard from '../components/moleculs/MediaCard';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useLanguageQuery } from '../hooks/useLanguageQuery';

const YEAR = ['2022年'];

const News: NextPage = () => {
  const [year, setYear] = useState<string>(`${new Date().getFullYear().toString()}年`);
  const [release, setRelease] = useState<NewsReleaseFindResponse['data']>([]);
  const router = useRouter();
  const languageQuery = useLanguageQuery(router);
  const { t } = useTranslation();

  // ページの起動時にニュースを取得する
  useEffect(() => {
    if (typeof window === 'object' && router.isReady) {
      strapi.findNewsRelease(isLanguageByQuery(isLanguageByQuery(languageQuery.lang))).then((e) => {
        setRelease([...e.data]);
      });
    }
  }, [router.query]);

  return (
    <div style={{ marginBottom: '5vh' }}>
      <Container maxWidth="lg" style={{ height: '100%' }}>
        <Header />
        <Toolbar />
        <Grid container>
          <Grid item xs={12} sm={6}>
            <PageTitle>{t('news.page_title')}</PageTitle>
          </Grid>
          <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
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
          </Grid>
        </Grid>
        <Grid container spacing={5} style={{ marginTop: '5vh' }}>
          {release.length === 0 && (
            <Grid item xs={12}>
              <Typography align="left">{t('no_articles')}</Typography>
            </Grid>
          )}
          {release.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <MediaCard
                title={item.attributes.title}
                description={item.attributes.description}
                date={item.attributes.publishedAt}
                image="/assets/img/symbol-logo-white.png"
                onClickLink={() => router.push({ pathname: `/news/${item.id}`, query: languageQuery })}
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

export default News;
