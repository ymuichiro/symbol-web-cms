/*

  コミュニティの情報を表示するページ（ページインデックスの表示ページ）

*/
import MainBackground from '@/components/atom/MainBackground';
import { Select } from '@/components/atom/Select';
import { PageTitle, SectionTitle } from '@/components/atom/Titles';
import { Toolbar } from '@/components/atom/Toolbar';
import AvatarLinkList from '@/components/moleculs/AvatarLinkList';
import Footer from '@/components/moleculs/Footer';
import Header from '@/components/moleculs/Header';
import MediaCard from '@/components/moleculs/MediaCard';
import { findCommunityRelease, findSpaceRelease, getHostingServerUrl, getImageUri } from '@/services/StrapiService';
import { CommunityReleaseFindResponse, SpaceFindResponse } from '@/types/StrapiModel';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import IconCommunity from '@/assets/icon/community.svg';
import { switchCommunityPlatformToLogo } from '@/services/UtilService';
import { Helmet } from 'react-helmet-async';

const YEAR = ['2022年'];

function Community(): JSX.Element {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'));
  const [year, setYear] = useState<string>(`${new Date().getFullYear().toString()}年`);
  const [release, setRelease] = useState<CommunityReleaseFindResponse['data']>([]);
  const [community, setCommunity] = useState<SpaceFindResponse['data']>([]);
  const { t, i18n } = useTranslation(['community']);

  // ページの起動時にニュースを取得する
  useEffect(() => {
    findCommunityRelease(i18n.language, { isIncludeMedia: true })
      .then((e) => setRelease([...e.data]))
      .catch(console.error);
    findSpaceRelease(i18n.language, { isIncludeMedia: true })
      .then((e) => setCommunity([...e.data]))
      .catch(console.error);
  }, [i18n.language]);

  return (
    <>
      <Helmet>
        <title>{`${import.meta.env.VITE_SITE_NAME}: Community`}</title>
      </Helmet>
      <div style={{ marginBottom: '5vh' }}>
        <Container maxWidth='lg'>
          <Header />
          <MainBackground />

          <Toolbar />
          <section>
            <Grid container spacing={1} style={{ height: '70vh' }}>
              <Grid item xs={12} sm={12} md={1}></Grid>
              <Grid item xs={12} sm={12} md={6}>
                <div style={{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'center' }}>
                  <PageTitle style={{ textAlign: matches ? 'center' : 'left' }}>{t('community:page_title')}</PageTitle>
                  <Typography variant='body1' style={{ textAlign: matches ? 'center' : 'left' }}>
                    {t('community:page_title_description')}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={IconCommunity} alt='community icon' style={{ width: '80%', maxWidth: '300px' }} />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={1}></Grid>
            </Grid>
          </section>
          <section>
            <SectionTitle>{t('community:community_introduce_section1')}</SectionTitle>
            <AvatarLinkList
              items={community
                .filter((e) => e.attributes.category === 'chat')
                .map((e) => {
                  return {
                    avatar: switchCommunityPlatformToLogo(e.attributes.platform),
                    avatarAlt: e.attributes.title,
                    title: e.attributes.title,
                    body: e.attributes.body,
                    url: e.attributes.url,
                  };
                })}
            />
            <div style={{ height: '1rem' }} />
            <SectionTitle>{t('community:community_introduce_section2')}</SectionTitle>
            <AvatarLinkList
              items={community
                .filter((e) => e.attributes.category === 'sns')
                .map((e) => {
                  return {
                    avatar: switchCommunityPlatformToLogo(e.attributes.platform),
                    avatarAlt: e.attributes.title,
                    title: e.attributes.title,
                    body: e.attributes.body,
                    url: e.attributes.url,
                  };
                })}
            />
            <div style={{ height: '1rem' }} />
            <SectionTitle>{t('community:community_introduce_section3')}</SectionTitle>
            <AvatarLinkList
              items={community
                .filter((e) => e.attributes.category === 'blog')
                .map((e) => {
                  return {
                    avatar: switchCommunityPlatformToLogo(e.attributes.platform),
                    avatarAlt: e.attributes.title,
                    title: e.attributes.title,
                    body: e.attributes.body,
                    url: e.attributes.url,
                  };
                })}
            />
          </section>
          <section style={{ marginTop: '10vh' }}>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <PageTitle>{t('community:section_title_release')}</PageTitle>
              </Grid>
              <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
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
              </Grid>
            </Grid>
            <Grid container spacing={5} style={{ marginTop: '5vh' }}>
              {release.length === 0 && (
                <Grid item xs={12}>
                  <Typography align='left'>{t('community:no_articles')}</Typography>
                </Grid>
              )}
              {release.map((item, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <MediaCard
                    title={item.attributes.title}
                    description={item.attributes.description}
                    date={item.attributes.publishedAt}
                    image={getImageUri(item.attributes.headerImage?.data.attributes?.url)}
                    tweetLink={getHostingServerUrl(undefined, 'community', item.id.toString())}
                    link={`/community/${item.id}`}
                    style={{ height: '100%' }}
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
    </>
  );
}

export default Community;
