import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { NewsReleaseFindResponse } from '@/types/StrapiModel';
import { Toolbar } from '@/components/atom/Toolbar';
import Header from '@/components/moleculs/Header';
import MediaCardWide from '@/components/moleculs/MediaCardWide';
import MediaCard from '@/components/moleculs/MediaCard';
import { findNewsRelease, getHostingServerUrl, getImageUri } from '@/services/StrapiService';
import Footer from '@/components/moleculs/Footer';
import LinkButton from '@/components/atom/LinkButton';
import MainBackground from '@/components/atom/MainBackground';
import FunctionsPresens from '@/components/moleculs/FunctionsPresens';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Link from '@mui/material/Link';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import nemLogo from '@/assets/logo/nem.webp';
import blocks from '@/assets/background/blocks.webp';
import puzzle from '@/assets/icon/puzzle.webp';
import blockchain from '@/assets/icon/blockchain.webp';
import gear from '@/assets/icon/gear.webp';
import ticket from '@/assets/icon/ticket.webp';
import token from '@/assets/icon/token.webp';
import secureFiles from '@/assets/background/secure-files.webp';
import fourLayerNetwork from '@/assets/background/four-layer-network.webp';
import moneyTree from '@/assets/background/money-tree.webp';
import serverInstall from '@/assets/background/server-install.webp';
import digitalWallet from '@/assets/background/digital-wallet.webp';
import cyberSecurityEngineer from '@/assets/background/cyber-security-engineer.webp';
import socialMediaManager from '@/assets/background/social-media-manager.webp';
import softwareDevelopers from '@/assets/background/software-developers.webp';
import symbol from '@/assets/logo/symbol.webp';
import { SectionTitle, SubTitle } from '../components/atom/Titles';

function Home(): JSX.Element {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'));
  const xssMatches = useMediaQuery('@media screen and (min-width:400px)');
  const [news, setNews] = useState<NewsReleaseFindResponse['data']>([]);
  const { t, i18n } = useTranslation(['index']);

  // ページの起動時の処理群
  useEffect(() => {
    findNewsRelease(i18n.language, { isIncludeMedia: true })
      .then((e) => setNews([...e.data]))
      .catch(console.error);
  }, [i18n.language]);

  useEffect(() => {
    console.log(news);
  }, [news]);

  return (
    <>
      <Helmet></Helmet>
      <div style={{ marginBottom: '5vh' }}>
        <Container maxWidth='lg' style={{ height: '100%' }}>
          <Header />
          {/* ヘッダーセクション */}
          <section>
            <MainBackground />
            <Toolbar />
            <div
              style={{
                height: '70vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '30px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography
                  color='white'
                  variant='h1'
                  fontWeight={'bold'}
                  align={'center'}
                  style={{ overflow: 'hidden', fontSize: xssMatches ? '3.5rem' : '2rem' }}
                >
                  <span style={{ color: theme.palette.primary.main }}>Empowering People</span> with Blockchain
                </Typography>
                <br />
                <Typography
                  color='white'
                  variant='body1'
                  fontWeight={'bold'}
                  align={matches ? 'center' : 'left'}
                  style={{ maxWidth: '600px', textAlign: 'center' }}
                >
                  {t('index:title_message')}
                </Typography>
              </div>
              <Grid container spacing={3} style={{ maxWidth: '600px' }}>
                <Grid item xs={12} sm={6}>
                  <LinkButton fullWidth size='large' href={t('index:start_card1_link')}>
                    Install wallet
                    <IoChevronForwardOutline />
                  </LinkButton>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LinkButton fullWidth size='large' href={t('index:quick_learn_symbol_link')} isNewTab>
                    Start Develop
                    <IoChevronForwardOutline />
                  </LinkButton>
                </Grid>
              </Grid>
            </div>
          </section>
          {/* 最初の説明セクション */}
          <section>
            <div style={{ height: '25vh' }} />
            <SubTitle align='center' style={{ color: theme.palette.primary.main }}>
              {t('index:history_title1')}
            </SubTitle>
            <div style={{ height: '15vh' }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    height={'auto'}
                    width={300}
                    alt='nem logo ネム ロゴ'
                    src={nemLogo}
                    style={{ width: '80%', maxWidth: '300px' }}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Typography variant='subtitle1' style={{ marginBottom: '1rem' }}>
                  {t('index:history_body1')}
                </Typography>
                <LinkButton
                  isNewTab
                  fullWidth
                  href='https://nemproject.github.io/nem-docs/pages/'
                  style={{ marginTop: '2rem', marginBottom: '1rem' }}
                >
                  {t('index:history_body1_Button')}
                </LinkButton>
              </Grid>
            </Grid>
          </section>
          {/* 特徴説明セクション */}
          <section>
            <div style={{ height: '20vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }} />
            <SubTitle align='center' style={{ color: theme.palette.primary.main }}>
              {t('index:functionary_section_title')}
            </SubTitle>
            <div style={{ height: '5vh' }} />

            <FunctionsPresens
              items={[
                {
                  title: t('index:functionary_title1'),
                  subtitle: t('index:functionary_subtitle1'),
                  body: t('index:functionary_body1'),
                  background: blocks,
                  icon: puzzle,
                  more: 'https://docs.symbol.dev/concepts/plugin.html',
                },
                {
                  title: t('index:functionary_title2'),
                  subtitle: t('index:functionary_subtitle2'),
                  body: t('index:functionary_body2'),
                  background: blockchain,
                  icon: gear,
                  more: 'https://docs.symbol.dev/concepts/plugin.html',
                },
                {
                  title: t('index:functionary_title3'),
                  subtitle: t('index:functionary_subtitle3'),
                  body: t('index:functionary_body3'),
                  background: ticket,
                  icon: token,
                  more: 'https://docs.symbol.dev/concepts/plugin.html',
                },
              ]}
            />
          </section>
          {/* 安全性説明セクション */}
          <section>
            <div style={{ height: '20vh' }} />
            <SubTitle align='center' style={{ color: theme.palette.primary.main }}>
              {t('index:secure_section_title')}
            </SubTitle>
            <div style={{ height: '5vh' }} />
            <div>
              {[
                {
                  title: t('index:secure_title1'),
                  description: t('index:secure_body1'),
                  image: secureFiles,
                  more: 'https://docs.symbol.dev/concepts/multisig-account.html',
                },

                {
                  title: t('index:secure_title2'),
                  description: t('index:secure_body2'),
                  image: fourLayerNetwork,
                  more: 'https://docs.symbol.dev/concepts/node.html',
                },
                {
                  title: t('index:secure_title3'),
                  description: t('index:secure_body3'),
                  image: moneyTree,
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
                    imageHeight={'60vh'}
                    style={{ marginBottom: '10vh', minHeight: '60vh' }}
                    key={i}
                  />
                );
              })}
            </div>
          </section>
          {/* ニュース簡易表示セクション */}
          <section>
            {news.length !== 0 && (
              <>
                <div style={{ height: '20vh' }} />
                <SubTitle align='center' style={{ color: theme.palette.primary.main }}>
                  {t('index:news_title')}
                </SubTitle>
                <div style={{ height: '5vh' }} />
                <Grid container spacing={5}>
                  {news.slice(0, 10).map((n, i) => {
                    return (
                      <Grid item xs={12} sm={6} md={4} key={i}>
                        <MediaCard
                          title={n.attributes.title}
                          description={n.attributes.description}
                          date={n.attributes.publishedAt}
                          image={getImageUri(n.attributes.headerImage?.data.attributes.url)}
                          tweetLink={getHostingServerUrl(undefined, 'news', n.id.toString())}
                          link={`news/${n.id}`}
                          style={{ height: '100%' }}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </>
            )}
          </section>
          {/* 簡単に導入できると説明するセクション */}
          <section>
            <div style={{ height: '20vh' }} />
            <SubTitle align='center' style={{ color: theme.palette.primary.main }}>
              {t('index:easy_section_title')}
            </SubTitle>
            <div style={{ height: '10vh' }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    height={'auto'}
                    width={400}
                    alt='symbol sdk description'
                    src={serverInstall}
                    style={{ width: '80%', maxWidth: '300px' }}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Typography variant='subtitle1' style={{ marginBottom: '1rem' }}>
                  {t('index:easy_section_body')}
                </Typography>
                <LinkButton
                  isNewTab
                  fullWidth
                  href={t('index:quick_learn_symbol_link')}
                  style={{ marginTop: '2rem', marginBottom: '1rem' }}
                >
                  {t('index:easy_section_button')}
                </LinkButton>
                <LinkButton isNewTab fullWidth href='https://docs.symbol.dev/sdk.html' style={{ marginBottom: '1rem' }}>
                  SDK Repositories
                </LinkButton>
              </Grid>
            </Grid>
          </section>
          {/* SymbolをはじめようSection */}
          <section>
            <Grid container style={{ marginTop: '20vh' }} spacing={5}>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <SubTitle align='center' style={{ color: theme.palette.primary.main }}>
                  {t('index:start_title')}
                </SubTitle>
              </Grid>
              {[
                {
                  title: t('index:start_card1'),
                  image: digitalWallet,
                  href: t('index:start_card1_link'),
                },
                {
                  title: t('index:start_card2'),
                  image: cyberSecurityEngineer,
                  href: t('index:start_card2_link'),
                },
                {
                  title: t('index:start_card3'),
                  image: socialMediaManager,
                  href: t('index:start_card3_link'),
                },
                {
                  title: t('index:start_card4'),
                  image: softwareDevelopers,
                  href: t('index:start_card4_link'),
                },
              ].map((item, index) => {
                return (
                  <Grid item xs={12} sm={6} key={index}>
                    <Link href={item.href}>
                      <ButtonBase
                        aria-label={item.title}
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundImage: `url(${item.image})`,
                          backgroundPosition: 'center center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'cover',
                          height: '30vh',
                          borderRadius: '10px',
                        }}
                      />
                    </Link>
                    <Typography color='white' style={{ position: 'relative', top: 0, left: 0 }}>
                      {item.title}
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
          </section>
          {/* Symbol Explorer */}
          <section>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '40vh',
                minHeight: '500px',
                gap: '3vh',
              }}
            >
              <Typography variant='h5' align='center' fontWeight='bold'>
                {t('index:end_message_title')}
              </Typography>
              <LinkButton
                isNewTab
                size='large'
                href='https://symbol.fyi/'
                style={{
                  background: `linear-gradient(to right bottom, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                  color: 'white',
                  padding: '0.5rem 2rem 0.5rem 2rem',
                  fontWeight: 'bold',
                }}
              >
                {t('index:end_message_body')}
              </LinkButton>
            </div>
          </section>

          {/* サイト運営について */}
          <section>
            <hr />
            <Grid container spacing={3} style={{ minHeight: '40vh' }}>
              <Grid
                item
                xs={12}
                sm={12}
                md={8}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: matches ? 'center' : undefined,
                  gap: '2rem',
                }}
              >
                <Typography
                  align={matches ? 'center' : 'left'}
                  variant='h4'
                  fontWeight='bold'
                  style={{ color: theme.palette.primary.main }}
                >
                  {t('index:about_site_management_title')}
                </Typography>
                <Typography align={matches ? 'center' : 'left'} variant='body1'>
                  {t('index:about_site_management_body')}
                </Typography>
                <LinkButton href='/about' fullWidth style={{ maxWidth: '300px' }}>
                  {t('index:about_site_management_title')}
                </LinkButton>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <div
                  style={{
                    display: 'flex',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={symbol}
                    alt='symbol シンボル nem logo icon'
                    height='auto'
                    width='200px'
                    style={{ width: '80%', maxWidth: '300px' }}
                  />
                </div>
              </Grid>
            </Grid>
            <hr />
          </section>
          {/* Footer */}
          <section style={{ marginTop: '100px' }}>
            <Footer />
          </section>
        </Container>
      </div>
    </>
  );
}

export default Home;
