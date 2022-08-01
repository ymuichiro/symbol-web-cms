import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { NewsReleaseFindResponse } from '../model/StrapiModel';
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
import { useLocale } from '../hooks/useLocale';
import { useRouter } from 'next/router';
import { useTranslation, useLanguageQuery, LanguageSwitcher } from 'next-export-i18n';

const Home: NextPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'));
  const [news, setNews] = useState<NewsReleaseFindResponse['data']>([]);
  // const { t, locale } = useLocale();
  const router = useRouter();
  const { t } = useTranslation();
  const [query] = useLanguageQuery();

  // ページの起動時の処理群
  useEffect(() => {
    console.log('now', t, query);
    if (typeof window === 'object') {
      // strapi.findNewsRelease(t).then((e) => setNews([...e.data]));
    }
  }, []);

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
                  {t('index.headline')}
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
          {new Array(3).fill('').map((_, i) => {
            return (
              <MediaCardWide
                title="About Symbol"
                description={new Array(10).fill('Symbolの特徴を示す説明を募集致します').join(' ')}
                imageUrl={`${router.basePath}/assets/img/symbol-logo-white.png`}
                isShowMore={true}
                showMoreLink={'/'}
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
            News Release
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
                    onClickLink={() => router.push('/news/' + n.id)}
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
                Start Symbol
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Image src={SymbolLogoWhiteImagee} alt="Symbol-Logo-White" height="200px" width="200px" />
            </Grid>
            <Grid item xs={12}>
              <div style={{ height: '10px' }} />
            </Grid>
            {['ウォレットの選び方', '注意するべきこと', '困った時相談先', '開発者向けの情報'].map((item, index) => {
              return (
                <Grid item xs={12} sm={6} key={index}>
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundImage: `url(${router.basePath}/assets/img/symbol-logo-white.png)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        height: '30vh',
                        filter: 'brightness(0.2)',
                        borderRadius: '10px',
                        border: '6px solid white',
                      }}
                    />
                    <Typography color="white" style={{ position: 'relative', top: 0, left: 0 }}>
                      {item}
                    </Typography>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </section>
        {/* Symbol Explorer */}
        <section>
          <Grid container justifyContent="center" alignItems="center" style={{ height: '60vh' }}>
            <Grid item xs={12} md={3}>
              <Typography variant="h5" align="center" fontWeight="bold">
                Symbol Explorer
              </Typography>
              <Typography variant="body1" align="center">
                Transactionを確認する
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
        <section>
          <Footer />
        </section>
      </Container>
    </div>
  );
};

export default Home;
