/*

  コミュニティの情報を表示するページ（ページインデックスの表示ページ）

*/
import IconCommunity from '@/assets/icon/community.svg';
import MainBackground from '@/components/atom/MainBackground';
import { PageTitle, SectionTitle } from '@/components/atom/Titles';
import AvatarLinkList from '@/components/moleculs/AvatarLinkList';
import Footer from '@/components/moleculs/Footer';
import Header from '@/components/moleculs/Header';
import MediaCard from '@/components/moleculs/MediaCard';
import { lang, langSelecter } from '@/languages';
import { findCommunityRelease, findSpaceRelease } from '@/services/StrapiService';
import { switchCommunityPlatformToLogo } from '@/services/UtilService';
import { CommunityReleaseFindResponse, SpaceFindResponse } from '@/types/StrapiModel';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Head from 'next/head';
import Image from 'next/image';
import { GetServerSideProps, NextPage } from 'next/types';

interface Props {
  i18n: lang['community'];
  communityReleases: CommunityReleaseFindResponse['data'];
  spaces: SpaceFindResponse['data'];
}

const Community: NextPage<Props> = ({ i18n, communityReleases, spaces }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'));

  return (
    <>
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_SITE_NAME}: Community`}</title>
      </Head>
      <Header />
      <Toolbar style={{ marginTop: '20px' }} />
      <div style={{ marginBottom: '5vh' }}>
        <Container maxWidth='lg'>
          <MainBackground />
          <Grid container spacing={1} style={{ height: '70vh' }}>
            <Grid item xs={12} sm={12} md={1}></Grid>
            <Grid item xs={12} sm={12} md={6}>
              <div style={{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'center' }}>
                <PageTitle style={{ textAlign: matches ? 'center' : 'left' }}>{i18n.page_title}</PageTitle>
                <Typography variant='body1' style={{ textAlign: matches ? 'center' : 'left' }}>
                  {i18n.page_title_description}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Image height={200} width={200} src={IconCommunity} alt='community icon' />
              </div>
            </Grid>
          </Grid>
          <SectionTitle>{i18n.community_introduce_section1}</SectionTitle>
          <AvatarLinkList
            items={spaces
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
          <SectionTitle>{i18n.community_introduce_section2}</SectionTitle>
          <AvatarLinkList
            items={spaces
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
          <SectionTitle>{i18n.community_introduce_section3}</SectionTitle>
          <AvatarLinkList
            items={spaces
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
          <PageTitle>{i18n.section_title_release}</PageTitle>
          <Grid container spacing={5} style={{ marginTop: '5vh' }}>
            {communityReleases.length === 0 && (
              <Grid item xs={12}>
                <Typography align='left'>{i18n.no_articles}</Typography>
              </Grid>
            )}
            {communityReleases.map((item, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <MediaCard
                  title={item.attributes.title}
                  description={item.attributes.description}
                  date={item.attributes.publishedAt}
                  image={`${process.env.NEXT_PUBLIC_API_URL}${item.attributes.headerImage?.data.attributes.url}`}
                  tweetLink={`${process.env.NEXT_PUBLIC_HOSTING_URL}/community/${item.id}`}
                  link={`/community/${item.id}`}
                  style={{ height: '100%' }}
                />
              </Grid>
            ))}
          </Grid>
          <Footer />
        </Container>
      </div>
    </>
  );
};

const getServerSideProps: GetServerSideProps<Props> = async ({ locale }) => {
  const communityArticles = await findCommunityRelease(locale, { isIncludeMedia: true });
  const spaceArticles = await findSpaceRelease(locale, { isIncludeMedia: true });
  return {
    props: {
      i18n: langSelecter(locale).community,
      communityReleases: communityArticles.data,
      spaces: spaceArticles.data,
    },
  };
};

export { getServerSideProps };
export default Community;
