/*

  コミュニティの情報を表示するページ（ページインデックスの表示ページ）

*/
import type { NextPage } from 'next';
import { Toolbar } from '../components/atom/Toolbar';
import { Select } from '../components/atom/Select';
import { useEffect, useState } from 'react';
import { PageTitle, SectionTitle } from '../components/atom/Titles';
import { CommunityReleaseFindResponse } from '../model/StrapiModel';
import { i18n, en, ja, ko } from '../i18n';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import Header from '../components/moleculs/Header';
import Footer from '../components/moleculs/Footer';
import strapi from '../service/StrapiService';
import MediaCard from '../components/moleculs/MediaCard';
import MainBackground from '../components/atom/MainBackground';
import AvatarLinkList from '../components/moleculs/AvatarLinkList';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

const YEAR = ['2022年'];
type Props = {
  i18nText: i18n;
};

const Community: NextPage<Props> = ({ i18nText }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'));
  const [year, setYear] = useState<string>(`${new Date().getFullYear().toString()}年`);
  const [release, setRelease] = useState<CommunityReleaseFindResponse['data']>([]);
  const router = useRouter();

  // ページの起動時にニュースを取得する
  useEffect(() => {
    if (typeof window === 'object' && router.isReady) {
      strapi.findCommunityRelease(router.locale, { isIncludeMedia: true }).then((e) => {
        setRelease([...e.data]);
      });
    }
  }, [router.query]);

  return (
    <div style={{ marginBottom: '5vh' }}>
      <Container maxWidth="lg">
        <Header />
        <MainBackground />
        <Toolbar />
        <section>
          <Grid container spacing={1} style={{ height: '70vh' }}>
            <Grid item xs={12} sm={12} md={1}></Grid>
            <Grid item xs={12} sm={12} md={6}>
              <div style={{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'center' }}>
                <PageTitle style={{ textAlign: matches ? 'center' : 'left' }}>
                  {i18nText.community.page_title}
                </PageTitle>
                <Typography variant="body1" style={{ textAlign: matches ? 'center' : 'left' }}>
                  {i18nText.community.page_title_description}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <img
                  src="/assets/img/reshot-icon-community-96NUC83B5K.svg"
                  alt="reshot icon"
                  style={{ maxWidth: '300px' }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={1}></Grid>
          </Grid>
        </section>
        <section>
          <SectionTitle>{i18nText.community.community_introduce_section1}</SectionTitle>
          <AvatarLinkList
            items={[
              {
                avatar: '/assets/icons/discord.svg',
                avatarAlt: i18nText.community.section1_title1,
                title: i18nText.community.section1_title1,
                body: i18nText.community.section1_body1,
                url: i18nText.community.section1_url1,
              },
              {
                avatar: '/assets/icons/discord.svg',
                avatarAlt: i18nText.community.section1_title2,
                title: i18nText.community.section1_title2,
                body: i18nText.community.section1_body2,
                url: i18nText.community.section1_url2,
              },
              {
                avatar: '/assets/icons/discord.svg',
                avatarAlt: i18nText.community.section1_title3,
                title: i18nText.community.section1_title3,
                body: i18nText.community.section1_body3,
                url: i18nText.community.section1_url3,
              },
              {
                avatar: '/assets/icons/discord.svg',
                avatarAlt: i18nText.community.section1_title4,
                title: i18nText.community.section1_title4,
                body: i18nText.community.section1_body4,
                url: i18nText.community.section1_url4,
              },
              {
                avatar: '/assets/icons/slack.svg',
                avatarAlt: i18nText.community.section1_title5,
                title: i18nText.community.section1_title5,
                body: i18nText.community.section1_body5,
                url: i18nText.community.section1_url5,
              },
            ]}
          />
          <div style={{ height: '1rem' }} />
          <SectionTitle>{i18nText.community.community_introduce_section2}</SectionTitle>
          <AvatarLinkList
            items={[
              {
                avatar: '/assets/icons/twitter.svg',
                avatarAlt: i18nText.community.section2_title1,
                title: i18nText.community.section2_title1,
                body: i18nText.community.section2_body1,
                url: i18nText.community.section2_url1,
              },
              {
                avatar: '/assets/icons/twitter.svg',
                avatarAlt: i18nText.community.section2_title2,
                title: i18nText.community.section2_title2,
                body: i18nText.community.section2_body2,
                url: i18nText.community.section2_url2,
              },
              {
                avatar: '/assets/icons/twitter.svg',
                avatarAlt: i18nText.community.section2_title3,
                title: i18nText.community.section2_title3,
                body: i18nText.community.section2_body3,
                url: i18nText.community.section2_url3,
              },
              {
                avatar: '/assets/icons/twitter.svg',
                avatarAlt: i18nText.community.section2_title4,
                title: i18nText.community.section2_title4,
                body: i18nText.community.section2_body4,
                url: i18nText.community.section2_url4,
              },
              {
                avatar: '/assets/icons/twitter.svg',
                avatarAlt: i18nText.community.section2_title5,
                title: i18nText.community.section2_title5,
                body: i18nText.community.section2_body5,
                url: i18nText.community.section2_url5,
              },
            ]}
          />
          <div style={{ height: '1rem' }} />
          <SectionTitle>{i18nText.community.community_introduce_section3}</SectionTitle>
          <AvatarLinkList
            items={[
              {
                avatar: '/assets/icons/news.svg',
                avatarAlt: i18nText.community.section3_title1,
                title: i18nText.community.section3_title1,
                body: i18nText.community.section3_body1,
                url: i18nText.community.section3_url1,
              },
              {
                avatar: '/assets/icons/news.svg',
                avatarAlt: i18nText.community.section3_title2,
                title: i18nText.community.section3_title2,
                body: i18nText.community.section3_body2,
                url: i18nText.community.section3_url2,
              },
              {
                avatar: '/assets/icons/news.svg',
                avatarAlt: i18nText.community.section3_title3,
                title: i18nText.community.section3_title3,
                body: i18nText.community.section3_body3,
                url: i18nText.community.section3_url3,
              },
              {
                avatar: '/assets/icons/github.svg',
                avatarAlt: i18nText.community.section3_title4,
                title: i18nText.community.section3_title4,
                body: i18nText.community.section3_body4,
                url: i18nText.community.section3_url4,
              },
              {
                avatar: '/assets/icons/news.svg',
                avatarAlt: i18nText.community.section3_title5,
                title: i18nText.community.section3_title5,
                body: i18nText.community.section3_body5,
                url: i18nText.community.section3_url5,
              },
              {
                avatar: '/assets/icons/news.svg',
                avatarAlt: i18nText.community.section3_title6,
                title: i18nText.community.section3_title6,
                body: i18nText.community.section3_body6,
                url: i18nText.community.section3_url6,
              },
            ]}
          />
        </section>
        <section style={{ marginTop: '10vh' }}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <PageTitle>{i18nText.community.section_title_release}</PageTitle>
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
                <Typography align="left">{i18nText.community.no_articles}</Typography>
              </Grid>
            )}
            {release.map((item, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <MediaCard
                  title={item.attributes.title}
                  description={item.attributes.description}
                  date={item.attributes.publishedAt}
                  image={strapi.getImageUri(item.attributes.headerImage?.data.attributes?.url)}
                  link={{ pathname: `/community/${item.id}` }}
                  style={{ height: "100%" }}
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

export default Community;
