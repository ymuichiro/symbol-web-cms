/*

  コミュニティの情報を表示するページ（ページインデックスの表示ページ）

*/
import type { NextPage } from 'next';
import { Toolbar } from '../components/atom/Toolbar';
import { Select } from '../components/atom/Select';
import { useEffect, useState } from 'react';
import { PageTitle } from '../components/atom/Titles';
import { CommunityReleaseFindResponse } from '../model/StrapiModel';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-export-i18n';
import { isLanguageByQuery } from '../i18n/isLanguageByQuery';
import Header from '../components/moleculs/Header';
import Footer from '../components/moleculs/Footer';
import Container from '@mui/material/Container';
import strapi from '../service/StrapiService';
import MediaCard from '../components/moleculs/MediaCard';
import Grid from '@mui/material/Grid';
import MediaCardWide from '../components/moleculs/MediaCardWide';
import Typography from '@mui/material/Typography';

const YEAR = ['2022年'];
const COMMUNITIES = [
  {
    title: 'Community name',
    description: new Array(10).fill('掲載するコミュニティ情報を募集します').join(' '),
    imageUrl: '/assets/img/symbol-logo-white.png',
  },
  {
    title: 'Community name',
    description: new Array(10).fill('掲載するコミュニティ情報を募集します').join(' '),
    imageUrl: '/assets/img/symbol-logo-white.png',
  },
  {
    title: 'Community name',
    description: new Array(10).fill('掲載するコミュニティ情報を募集します').join(' '),
    imageUrl: '/assets/img/symbol-logo-white.png',
  },
  {
    title: 'Community name',
    description: new Array(10).fill('掲載するコミュニティ情報を募集します').join(' '),
    imageUrl: '/assets/img/symbol-logo-white.png',
  },
  {
    title: 'Community name',
    description: new Array(10).fill('掲載するコミュニティ情報を募集します').join(' '),
    imageUrl: '/assets/img/symbol-logo-white.png',
  },
];

const Community: NextPage = () => {
  const [year, setYear] = useState<string>(`${new Date().getFullYear().toString()}年`);
  const [release, setRelease] = useState<CommunityReleaseFindResponse['data']>([]);
  const router = useRouter();
  const { t } = useTranslation();

  // ページの起動時にニュースを取得する
  useEffect(() => {
    if (typeof window === 'object' && router.isReady) {
      strapi.findCommunityRelease(isLanguageByQuery(router.query.lang)).then((e) => {
        setRelease([...e.data]);
      });
    }
  }, [router.query]);

  return (
    <div style={{ marginBottom: '5vh' }}>
      <Container maxWidth="lg" style={{ height: '100%' }}>
        <Header />
        <Toolbar />
        <section style={{ marginTop: '10vh' }}>
          <PageTitle>{t('community.page_title')}</PageTitle>
          {COMMUNITIES.map((item, index) => (
            <MediaCardWide
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
              isShowMore={true}
              showMoreLink={'/'}
              imageHeight={'20vh'}
              style={{ marginTop: '3vh' }}
              key={index}
            />
          ))}
        </section>
        <section style={{ marginTop: '10vh' }}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <PageTitle>{t('community.section_title_release')}</PageTitle>
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
                <Typography align="left">{t('community.no_articles')}</Typography>
              </Grid>
            )}
            {release.map((item, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <MediaCard
                  title={item.attributes.title}
                  description={item.attributes.description}
                  date={item.attributes.publishedAt}
                  image="/assets/img/symbol-logo-white.png"
                  onClickLink={() => router.push('/community/' + item.id)}
                />
              </Grid>
            ))}
          </Grid>
        </section>
        <section style={{ marginTop: '10vh' }}>
          <Footer />
        </section>
      </Container>
    </div>
  );
};

export default Community;
