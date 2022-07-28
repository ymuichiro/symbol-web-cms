/*

  Symbol関連の情報のうち、公的な情報の取り扱いページ（インデックス側のページ）

*/
import type { NextPage } from 'next';
import { useTheme } from '@mui/material/styles';
import { Toolbar } from '../components/atom/Toolbar';
import { Select } from '../components/atom/Select';
import { useContext, useEffect, useState } from 'react';
import { PageTitle } from '../components/atom/Titles';
import { NewsReleaseFindResponse } from '../model/StrapiModel';
import Header from '../components/moleculs/Header';
import Footer from '../components/moleculs/Footer';
import Container from '@mui/material/Container';
import strapi from '../service/StrapiService';
import MediaCard from '../components/moleculs/MediaCard';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';
import { SystemContext } from '../context';

const YEAR = ['2022年'];

const News: NextPage = () => {
  const theme = useTheme();
  const [year, setYear] = useState<string>(`${new Date().getFullYear().toString()}年`);
  const [news, setNews] = useState<NewsReleaseFindResponse['data']>([]);
  const router = useRouter();
  const { contextState, updateContext } = useContext(SystemContext);

  // ページの起動時にニュースを取得する
  useEffect(() => {
    if (typeof window === 'object') {
      strapi.findNewsRelease().then((e) => {
        setNews([...e.data]);
      });
    }
  }, []);

  return (
    <div style={{ marginBottom: '5vh' }}>
      <Container maxWidth="lg" style={{ height: '100%' }}>
        <Header />
        <Toolbar />
        <Grid container>
          <Grid item xs={12} sm={6}>
            <PageTitle>News Release</PageTitle>
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
        <Grid container spacing={5} style={{ marginTop: '5vh', marginBottom: '10vh' }}>
          {news.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <MediaCard
                title={item.attributes.title}
                description={item.attributes.body}
                date={item.attributes.publishedAt}
                image="/assets/img/symbol-logo-white.png"
                onClickLink={() => router.push('/news/' + item.id)}
              />
            </Grid>
          ))}
        </Grid>
        <Footer />
      </Container>
    </div>
  );
};

export default News;
