import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { NewsReleaseFindResponse } from '../model/StrapiModel';
import { useRouter } from 'next/router';
import { i18n, en, ja } from '../i18n';
import { Toolbar } from '../components/atom/Toolbar';
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
import Button from '@mui/material/Button';
// icons
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FunctionsPresens from '../components/moleculs/FunctionsPresens';
import ButtonBase from '@mui/material/ButtonBase';

type Props = {
  i18nText: i18n;
};

const Home: NextPage<Props> = ({ i18nText }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'));
  const [news, setNews] = useState<NewsReleaseFindResponse['data']>([]);
  const [backgroundOpacity, setBackgroundOpacity] = useState<number>(0.6);
  const router = useRouter();

  const onScrollHandle = () => {
    const position = window.scrollY;
    if (position.toString() !== 'NaN' && position < 1000) {
      const currentOpacity = 0.6 - position / 1000;
      if (currentOpacity > 0.3) {
        setBackgroundOpacity(currentOpacity);
      }
    }
  };

  // ページの起動時の処理群
  useEffect(() => {
    if (typeof window === 'object' && router.isReady) {
      console.log('fetch');
      strapi
        .findNewsRelease(router.locale)
        .then((e) => {
          console.log('result', e);
          setNews([...e.data]);
        })
        .catch((e) => console.error(e));
    }
  }, [router.query]);

  useEffect(() => {
    console.log(news);
  }, [news]);

  useEffect(() => {
    document.addEventListener('scroll', onScrollHandle);
  }, []);

  return (
    <div style={{ marginBottom: '5vh' }}>
      <Container maxWidth="lg" style={{ height: '100%' }}>
        <Header />
        {/* ヘッダーセクション */}
        <section>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '80vh',
              backgroundImage: `url(${router.basePath}/assets/img/header-background.png)`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              zIndex: -1,
              opacity: backgroundOpacity,
              WebkitMaskImage: 'linear-gradient(rgb(0,0,0),rgb(0,0,0),rgb(0,0,0),rgba(0,0,0,0))',
            }}
          ></div>
          <Toolbar />
          <div
            style={{
              height: '60vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              gap: '30px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Typography
                color="white"
                variant="h1"
                fontWeight={'bold'}
                align={'center'}
                style={{ fontSize: '3.5rem' }}
              >
                <span style={{ color: theme.palette.primary.main }}>Empowering People</span> with Blockchain
              </Typography>
              <br />
              <Typography
                color="white"
                variant="body1"
                fontWeight={'bold'}
                align={matches ? 'center' : 'left'}
                style={{ maxWidth: '600px', textAlign: 'center' }}
              >
                {i18nText.index.title_message}
              </Typography>
            </div>
            <Grid container spacing={3} style={{ maxWidth: '600px' }}>
              {['Install Wallet', 'Start Develop'].map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Button variant="contained" color="primary" size="large" fullWidth>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '3px' }}>
                      {item}
                      <KeyboardArrowRightIcon />
                    </div>
                  </Button>
                </Grid>
              ))}
            </Grid>
          </div>
        </section>
        {/* 最初の説明セクション */}
        <section>
          <div style={{ height: '25vh' }} />
          <Typography align="center" variant="h4" fontWeight="bold" style={{ color: theme.palette.primary.main }}>
            {i18nText.index.history_title1}
          </Typography>
          <div style={{ height: '15vh' }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image
                  height={300}
                  width={300}
                  objectFit="contain"
                  src={`${router.basePath}/assets/img/nem-logo.png`}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Typography variant="subtitle1" style={{ marginBottom: '1rem' }}>
                {i18nText.index.history_body1}
              </Typography>
              <Button
                variant="contained"
                LinkComponent={'a'}
                href="https://nemproject.github.io/nem-docs/pages/"
                rel="noopener noreferrer"
                target="_blank"
                fullWidth
                style={{ marginTop: '2rem', marginBottom: '1rem' }}
              >
                {i18nText.index.history_body1_Button}
              </Button>
            </Grid>
          </Grid>
        </section>
        {/* 特徴説明セクション */}
        <section>
          <div style={{ height: '20vh' }} />
          <Typography align="center" variant="h4" fontWeight="bold" style={{ color: theme.palette.primary.main }}>
            {i18nText.index.functionary_section_title}
          </Typography>
          <div style={{ height: '5vh' }} />
          <FunctionsPresens
            items={[
              {
                title: i18nText.index.functionary_title1,
                subtitle: i18nText.index.functionary_subtitle1,
                body: i18nText.index.functionary_body1,
                background: `${router.basePath}/assets/img/reshot-icon-tumbling-blocks-7V4WT8ZAQY.png`,
                icon: `${router.basePath}/assets/img/reshot-icon-puzzle-block-4VJ29ER6UF.png`,
                more: 'https://docs.symbol.dev/concepts/plugin.html',
              },
              {
                title: i18nText.index.functionary_title2,
                subtitle: i18nText.index.functionary_subtitle2,
                body: i18nText.index.functionary_body2,
                background: `${router.basePath}/assets/img/reshot-icon-blockchain-4DVEYGLHWB.png`,
                icon: `${router.basePath}/assets/img/reshot-icon-gear-in-the-box-WBDG7C93T4.png`,
                more: 'https://docs.symbol.dev/concepts/plugin.html',
              },
              {
                title: i18nText.index.functionary_title3,
                subtitle: i18nText.index.functionary_subtitle3,
                body: i18nText.index.functionary_body3,
                background: `${router.basePath}/assets/img/reshot-icon-movie-ticket-RFBH8E9MQJ.png`,
                icon: `${router.basePath}/assets/img/reshot-icon-token-ERTB6HXPFK.png`,
                more: 'https://docs.symbol.dev/concepts/plugin.html',
              },
            ]}
          />
        </section>
        {/* 安全性説明セクション */}
        <section>
          <div style={{ height: '20vh' }} />
          <Typography align="center" variant="h4" fontWeight="bold" style={{ color: theme.palette.primary.main }}>
            {i18nText.index.secure_section_title}
          </Typography>
          <div style={{ height: '5vh' }} />
          <div>
            {[
              {
                title: i18nText.index.secure_title1,
                description: i18nText.index.secure_body1,
                image: `${router.basePath}/assets/img/reshot-illustration-secure-files-63RH5MNAW2.png`,
                more: 'https://docs.symbol.dev/concepts/multisig-account.html',
              },

              {
                title: i18nText.index.secure_title2,
                description: i18nText.index.secure_body2,
                image: `${router.basePath}/assets/img/four-layer-network.png`,
                more: 'https://docs.symbol.dev/concepts/node.html',
              },
              {
                title: i18nText.index.secure_title3,
                description: i18nText.index.secure_body3,
                image: `${router.basePath}/assets/img/reshot-illustration-money-tree-RDK5M28AE3.png`,
                more: 'https://docs.symbol.dev/concepts/consensus-algorithm.html#sidebar',
              },
            ].map((content, i) => {
              return (
                <MediaCardWide
                  title={content.title}
                  description={content.description}
                  imageUrl={content.image}
                  showMoreLink={content.more}
                  isShowMore={true}
                  imageHeight={'100%'}
                  style={{ marginBottom: '5vh' }}
                  key={i}
                />
              );
            })}
          </div>
        </section>
        {/* ニュース簡易表示セクション */}
        <section>
          <div style={{ height: '20vh' }} />
          <Typography align="center" variant="h4" fontWeight="bold" style={{ color: theme.palette.primary.main }}>
            {i18nText.index.news_title}
          </Typography>
          <div style={{ height: '5vh' }} />
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
        {/* 簡単に導入できると説明するセクション */}
        <section>
          <div style={{ height: '20vh' }} />
          <Typography align="center" variant="h4" fontWeight="bold" style={{ color: theme.palette.primary.main }}>
            {i18nText.index.easy_section_title}
          </Typography>
          <div style={{ height: '10vh' }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image
                  height={300}
                  width={400}
                  objectFit="contain"
                  src={`${router.basePath}/assets/img/server_install.png`}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Typography variant="subtitle1" style={{ marginBottom: '1rem' }}>
                {i18nText.index.easy_section_body}
              </Typography>
              <Button
                variant="contained"
                LinkComponent={'a'}
                href="https://github.com/xembook/quick_learning_symbol"
                rel="noopener noreferrer"
                target="_blank"
                fullWidth
                style={{ marginTop: '2rem', marginBottom: '1rem' }}
              >
                {i18nText.index.easy_section_button}
              </Button>
              <Button
                variant="contained"
                LinkComponent={'a'}
                href="https://docs.symbol.dev/sdk.html"
                rel="noopener noreferrer"
                target="_blank"
                fullWidth
                style={{ marginBottom: '1rem' }}
              >
                SDK Repositories
              </Button>
            </Grid>
          </Grid>
        </section>
        {/* SymbolをはじめようSection */}
        <section>
          <Grid container style={{ marginTop: '20vh' }} spacing={5}>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h4" align="center" fontWeight="bold" color="text.primary" gutterBottom>
                {i18nText.index.start_title}
              </Typography>
            </Grid>
            {[
              {
                title: i18nText.index.start_card1,
                image: `${router.basePath}/assets/img/reshot-illustration-crypto-digital-wallet-DJLEMYZTQN-0ec78.png`,
                onClick: () => {},
              },
              {
                title: i18nText.index.start_card2,
                image: `${router.basePath}/assets/img/reshot-illustration-cyber-security-engineer-QRZA6W2N4U.png`,
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
                    <ButtonBase
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundImage: `url(${item.image})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        height: '30vh',
                        borderRadius: '10px',
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '10vh',
              gap: '3vh',
            }}
          >
            <Typography variant="h5" align="center" fontWeight="bold">
              {i18nText.index.end_message_title}
            </Typography>
            <Button
              variant="contained"
              size="large"
              style={{
                background: `linear-gradient(to right bottom, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                color: 'white',
                padding: '0.5rem 2rem 0.5rem 2rem',
                fontWeight: 'bold',
              }}
            >
              {i18nText.index.end_message_body}
            </Button>
          </div>
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
