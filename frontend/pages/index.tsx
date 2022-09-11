import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { NewsReleaseFindResponse } from '../model/StrapiModel';
import { useRouter } from 'next/router';
import { i18n, en, ja } from '../i18n';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../components/moleculs/Header';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MediaCardWide from '../components/moleculs/MediaCardWide';
import MediaCard from '../components/moleculs/MediaCard';
import strapi from '../service/StrapiService';
import Footer from '../components/moleculs/Footer';
import Image from 'next/image';
import SymbolExplorerImage from '../public/assets/img/symbol-explorer.png';
import SymbolLogoWhiteImagee from '../public/assets/img/symbol-logo-white.png';

type Props = {
  i18nText: i18n;
};

const Home: NextPage<Props> = ({ i18nText }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'));
  const [news, setNews] = useState<NewsReleaseFindResponse['data']>([]);
  const router = useRouter();

  // ページの起動時の処理群
  useEffect(() => {
    if (typeof window === 'object' && router.isReady) {
      strapi.findNewsRelease(router.locale).then((e) => setNews([...e.data]));
    }
  }, [router.query]);

  return (
    <div style={{ marginBottom: '5vh' }}>
      <Container maxWidth="lg" style={{ height: '100%' }}>
        <Header />
        {/* ヘッダーセクション */}
        <section>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100vw',
              height: '80vh',
              backgroundImage: `url(${router.basePath}/assets/img/header-background.png)`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              zIndex: -1,
              WebkitMaskImage: 'linear-gradient(rgb(0,0,0),rgb(0,0,0),rgb(0,0,0),rgba(0,0,0,0))',
            }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '80vh',
              width: '100%',
            }}
          >
            <Grid container justifyContent="center" alignItems="center" spacing={matches ? 5 : 0}>
              <Grid item xs={12} md={6}>
                <Typography
                  color="white"
                  variant="h1"
                  fontWeight={'bold'}
                  align={matches ? 'center' : 'left'}
                  style={{ fontSize: '2em', paddingLeft: '20px' }}
                >
                  Welcom to {matches && <br />} Symbol &amp; NEM
                </Typography>
                <br />
                <Typography
                  color="white"
                  variant="body1"
                  fontWeight={'bold'}
                  align={matches ? 'center' : 'left'}
                  style={{ paddingLeft: '20px' }}
                >
                  {i18nText.index.title_message}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image src={SymbolLogoWhiteImagee} alt="Symbol-Logo-White" height="200px" width="200px" />
              </Grid>
            </Grid>
          </div>
        </section>
        {/* 特徴説明セクション */}
        <section>
          {[
            {
              title: i18nText.index.feature_title1,
              description: i18nText.index.feature_body1,
              image: `${router.basePath}/assets/img/reshot-illustration-isometric-technical-support-482YXS7HJP.png`,
              more: 'https://docs.symbol.dev/handbook/index.html',
            },
            {
              title: i18nText.index.feature_title2,
              description: i18nText.index.feature_body2,
              image: `${router.basePath}/assets/img/reshot-illustration-isometric-teamwork-Q9N263475D.png`,
              more: 'https://docs.symbol.dev/concepts/plugin.html',
            },
            {
              title: i18nText.index.feature_title3,
              description: i18nText.index.feature_body3,
              image: `${router.basePath}/assets/img/reshot-illustration-secure-files-63RH5MNAW2.png`,
              more: 'https://docs.symbol.dev/concepts/multisig-account.html',
            },
            {
              title: i18nText.index.feature_title4,
              description: i18nText.index.feature_body4,
              image: `${router.basePath}/assets/img/reshot-illustration-isometric-startup-development-V2B8Q7PS9T.png`,
              more: 'https://docs.symbol.dev/concepts/aggregate-transaction.html',
            },
            {
              title: i18nText.index.feature_title5,
              description: i18nText.index.feature_body5,
              image: `${router.basePath}/assets/img/reshot-illustration-cyber-security-engineer-QRZA6W2N4U.png`,
              more: 'https://docs.symbol.dev/concepts/mosaic.html',
            },
            {
              title: i18nText.index.feature_title6,
              description: i18nText.index.feature_body6,
              image: `${router.basePath}/assets/img/reshot-illustration-money-tree-RDK5M28AE3.png`,
              more: 'https://docs.symbol.dev/concepts/node.html',
            },
            {
              title: i18nText.index.feature_title7,
              description: i18nText.index.feature_body7,
              image: `${router.basePath}/assets/img/reshot-illustration-money-tree-RDK5M28AE3.png`,
              more: 'https://docs.symbol.dev/concepts/consensus-algorithm.html#sidebar',
            },
            {
              title: i18nText.index.feature_title8,
              description: i18nText.index.feature_body8,
              image: `${router.basePath}/assets/img/reshot-illustration-smartphone-tool-app-MDYG6AH5RC.png`,
              more: 'https://docs.symbol.dev/references/overview.html',
            },
          ].map((content, i) => {
            return (
              <MediaCardWide
                title={content.title}
                description={content.description}
                imageUrl={content.image}
                showMoreLink={{ pathname: '/' }}
                isShowMore={true}
                imageHeight={'50vh'}
                style={{ marginTop: '20vh' }}
                key={i}
              />
            );
          })}
        </section>
        {/* ニュース簡易表示セクション */}
        <section>
          <Typography variant="h4" align="center" color="text.primary" gutterBottom style={{ marginTop: '10vh' }}>
            {i18nText.index.news_title}
          </Typography>
          <Grid container spacing={5}>
            {news.map((n, i) => {
              return (
                <Grid item xs={12} sm={6} key={i}>
                  <MediaCard
                    title={n.attributes.title}
                    description={n.attributes.description}
                    date={n.attributes.publishedAt}
                    image={`${router.basePath}/assets/img/symbol-logo-white.png`}
                    onClickLink={() => router.push({ pathname: '/news/' + n.id })}
                  />
                </Grid>
              );
            })}
          </Grid>
        </section>
        {/* SymbolをはじめようSection */}
        <section>
          <Grid container style={{ marginTop: '10vh' }} spacing={5}>
            <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h4" align="center" fontWeight="bold" color="text.primary" gutterBottom>
                {i18nText.index.start_title}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Image src={SymbolLogoWhiteImagee} alt="Symbol-Logo-White" height="200px" width="200px" />
            </Grid>
            <Grid item xs={12}>
              <div style={{ height: '10px' }} />
            </Grid>
            {[
              {
                title: i18nText.index.start_card1,
                image: `${router.basePath}/assets/img/reshot-illustration-crypto-digital-wallet-DJLEMYZTQN-0ec78.png`,
                onClick: () => {},
              },
              {
                title: i18nText.index.start_card2,
                image: `${router.basePath}/assets/img/reshot-illustration-chat-bot-data-security-HGS4CXMJAE.png`,
                onClick: () => {},
              },
              {
                title: i18nText.index.start_card3,
                image: `${router.basePath}/assets/img/reshot-illustration-social-media-manager-R48ZCSE7KP.png`,
                onClick: () => {},
              },
              {
                title: i18nText.index.start_card4,
                image: `${router.basePath}/assets/img/reshot-illustration-software-developers-59RL8CT7WX.png`,
                onClick: () => {},
              },
            ].map((item, index) => {
              return (
                <Grid item xs={12} sm={6} key={index}>
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundImage: `url(${item.image})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        height: '30vh',
                        filter: 'brightness(0.2)',
                        borderRadius: '10px',
                        border: '6px solid white',
                      }}
                    />
                    <Typography color="white" style={{ position: 'relative', top: 0, left: 0 }}>
                      {item.title}
                    </Typography>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </section>
        {/* Symbol Explorer */}
        <section style={{ marginTop: '100px' }}>
          <Grid container justifyContent="center" alignItems="center" style={{ height: '60vh' }}>
            <Grid item xs={12} md={3}>
              <Typography variant="h5" align="center" fontWeight="bold">
                {i18nText.index.explorer_title}
              </Typography>
              <Typography variant="body1" align="center">
                {i18nText.index.explorer_body}
              </Typography>
            </Grid>
            <Grid item xs={12} md={9} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Image
                src={SymbolExplorerImage}
                height={677}
                width={1200}
                alt="Symbol-Explorer"
                style={{
                  borderRadius: '10px',
                  marginTop: '5px',
                  filter: 'brightness(150%) contrast(110%)',
                }}
              />
            </Grid>
          </Grid>
        </section>
        {/* Footer */}
        <section style={{ marginTop: '100px' }}>
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

export default Home;
