import LinkButton from '@/components/atom/LinkButton';
import MainBackground from '@/components/atom/MainBackground';
import Footer from '@/components/moleculs/Footer';
import FunctionsPresens from '@/components/moleculs/FunctionsPresens';
import MediaCard from '@/components/moleculs/MediaCard';
import MediaCardWide from '@/components/moleculs/MediaCardWide';
import { findNewsRelease } from '@/services/StrapiService';
import { NewsReleaseFindResponse } from '@/types/StrapiModel';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { SubTitle } from '../components/atom/Titles';
import blocks from '@/assets/background/blocks.webp';
import symbol from '@/assets/logo/symbol.webp';
import { GetStaticProps, NextPage } from 'next/types';
import { langSelecter, lang } from '@/languages';
import cyberSecurityEngineer from '@/assets/background/cyber-security-engineer.webp';
import digitalWallet from '@/assets/background/digital-wallet.webp';
import fourLayerNetwork from '@/assets/background/four-layer-network.webp';
import moneyTree from '@/assets/background/money-tree.webp';
import secureFiles from '@/assets/background/secure-files.webp';
import serverInstall from '@/assets/background/server-install.webp';
import socialMediaManager from '@/assets/background/social-media-manager.webp';
import softwareDevelopers from '@/assets/background/software-developers.webp';
import blockchain from '@/assets/icon/blockchain.webp';
import gear from '@/assets/icon/gear.webp';
import puzzle from '@/assets/icon/puzzle.webp';
import ticket from '@/assets/icon/ticket.webp';
import token from '@/assets/icon/token.webp';
import nemLogo from '@/assets/logo/nem.webp';
import Header from '@/components/moleculs/Header';
import Toolbar from '@mui/material/Toolbar';

interface Props {
  i18n: lang['index'];
  newsReleases: NewsReleaseFindResponse['data'];
}

const Home: NextPage<Props> = ({ i18n, newsReleases }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'));
  const xssMatches = useMediaQuery('@media screen and (min-width:400px)');

  return (
    <>
      <Header />
      <Toolbar style={{ marginTop: '20px' }} />
      <div style={{ marginBottom: '5vh' }}>
        <Container maxWidth='lg' style={{ height: '100%' }}>
          {/* ヘッダーセクション */}
          <section>
            <MainBackground />
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
                  {i18n.title_message}
                </Typography>
              </div>
              <Grid container spacing={3} style={{ maxWidth: '600px' }}>
                <Grid item xs={12} sm={6}>
                  <LinkButton fullWidth size='large' href={i18n.start_card1_link}>
                    Install wallet
                    <IoChevronForwardOutline />
                  </LinkButton>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LinkButton isNewTab fullWidth size='large' href={i18n.quick_learn_symbol_link}>
                    Start Develop
                    <IoChevronForwardOutline />
                  </LinkButton>
                </Grid>
              </Grid>
            </div>
          </section>
          {/* 最初の説明セクション */}
          <section>
            <SubTitle align='center' style={{ marginBottom: '15vh' }}>
              {i18n.history_title1}
            </SubTitle>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} style={{ display: 'flex', justifyContent: 'center' }}>
                <Image height={300} width={300} alt='nem logo ネム ロゴ' src={nemLogo} />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Typography variant='subtitle1' style={{ marginBottom: '2rem' }}>
                  {i18n.history_body1}
                </Typography>
                <LinkButton isNewTab fullWidth href='https://nemproject.github.io/nem-docs/pages/'>
                  {i18n.history_body1_Button}
                </LinkButton>
              </Grid>
            </Grid>
          </section>
          {/* 特徴説明セクション */}
          <section>
            <SubTitle align='center' style={{ marginBottom: '5vh' }}>
              {i18n.functionary_section_title}
            </SubTitle>
            <FunctionsPresens
              items={[
                {
                  title: i18n.functionary_title1,
                  subtitle: i18n.functionary_subtitle1,
                  body: i18n.functionary_body1,
                  background: blocks,
                  icon: puzzle,
                  more: 'https://docs.symbol.dev/concepts/plugin.html',
                },
                {
                  title: i18n.functionary_title2,
                  subtitle: i18n.functionary_subtitle2,
                  body: i18n.functionary_body2,
                  background: blockchain,
                  icon: gear,
                  more: 'https://docs.symbol.dev/concepts/plugin.html',
                },
                {
                  title: i18n.functionary_title3,
                  subtitle: i18n.functionary_subtitle3,
                  body: i18n.functionary_body3,
                  background: ticket,
                  icon: token,
                  more: 'https://docs.symbol.dev/concepts/plugin.html',
                },
              ]}
            />
          </section>
          {/* 安全性説明セクション */}
          <section>
            <SubTitle align='center' style={{ marginBottom: '5vh' }}>
              {i18n.secure_section_title}
            </SubTitle>
            {[
              {
                title: i18n.secure_title1,
                description: i18n.secure_body1,
                image: secureFiles,
                more: 'https://docs.symbol.dev/concepts/multisig-account.html',
              },

              {
                title: i18n.secure_title2,
                description: i18n.secure_body2,
                image: fourLayerNetwork,
                more: 'https://docs.symbol.dev/concepts/node.html',
              },
              {
                title: i18n.secure_title3,
                description: i18n.secure_body3,
                image: moneyTree,
                more: 'https://docs.symbol.dev/concepts/consensus-algorithm.html#sidebar',
              },
            ].map((content, i) => {
              return (
                <MediaCardWide
                  title={content.title}
                  description={content.description}
                  image={content.image}
                  showMoreLink={content.more}
                  isShowMore={true}
                  imageHeight={'60vh'}
                  style={{ marginBottom: '10vh', minHeight: '60vh' }}
                  key={i}
                />
              );
            })}
          </section>
          {/* ニュース簡易表示セクション */}
          <section>
            {newsReleases.length !== 0 && (
              <>
                <SubTitle align='center' style={{ marginBottom: '5vh' }}>
                  {i18n.news_title}
                </SubTitle>
                <Grid container spacing={5}>
                  {newsReleases.slice(0, 10).map((n, i) => {
                    return (
                      <Grid item xs={12} sm={6} md={4} key={i}>
                        <MediaCard
                          title={n.attributes.title}
                          description={n.attributes.description}
                          date={n.attributes.publishedAt}
                          image={`${process.env.NEXT_PUBLIC_API_URL}${n.attributes.headerImage?.data.attributes.url}`}
                          tweetLink={`${process.env.NEXT_PUBLIC_HOSTING_URL}/news/${n.id}`}
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
              {i18n.easy_section_title}
            </SubTitle>
            <div style={{ height: '10vh' }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Image width={400} alt='symbol sdk description' src={serverInstall} style={{ height: 'auto' }} />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Typography variant='subtitle1' style={{ marginBottom: '1rem' }}>
                  {i18n.easy_section_body}
                </Typography>
                <LinkButton
                  isNewTab
                  fullWidth
                  href={i18n.quick_learn_symbol_link}
                  style={{ marginTop: '2rem', marginBottom: '1rem' }}
                >
                  {i18n.easy_section_button}
                </LinkButton>
                <LinkButton isNewTab fullWidth href='https://docs.symbol.dev/sdk.html' style={{ marginBottom: '1rem' }}>
                  SDK Repositories
                </LinkButton>
              </Grid>
            </Grid>
          </section>
          {/* SymbolをはじめようSection */}
          <section>
            <Grid container spacing={5}>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <SubTitle align='center' style={{ color: theme.palette.primary.main }}>
                  {i18n.start_title}
                </SubTitle>
              </Grid>
              {[
                {
                  title: i18n.start_card1,
                  image: digitalWallet,
                  href: i18n.start_card1_link,
                },
                {
                  title: i18n.start_card2,
                  image: cyberSecurityEngineer,
                  href: i18n.start_card2_link,
                },
                {
                  title: i18n.start_card3,
                  image: socialMediaManager,
                  href: i18n.start_card3_link,
                },
                {
                  title: i18n.start_card4,
                  image: softwareDevelopers,
                  href: i18n.start_card4_link,
                },
              ].map((item, index) => {
                return (
                  <Grid item xs={12} md={6} key={index}>
                    <Link href={item.href}>
                      <ButtonBase aria-label={item.title} style={{ width: '100%', height: 250 }}>
                        <div style={{ width: '100%', backgroundColor: 'white', borderRadius: '10px' }}>
                          <Image
                            height={250}
                            src={item.image}
                            alt={item.title}
                            style={{ width: 'auto', objectFit: 'cover' }}
                          />
                        </div>
                      </ButtonBase>
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
                {i18n.end_message_title}
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
                {i18n.end_message_body}
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
                  {i18n.about_site_management_title}
                </Typography>
                <Typography align={matches ? 'center' : 'left'} variant='body1'>
                  {i18n.about_site_management_body}
                </Typography>
                <LinkButton href='/about' fullWidth style={{ maxWidth: '300px' }}>
                  {i18n.about_site_management_title}
                </LinkButton>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                  }}
                >
                  <Image src={symbol} alt='symbol シンボル nem logo icon' width={200} height={200} />
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
};

const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const articles = await findNewsRelease(locale, { isIncludeMedia: true });
  return {
    props: {
      i18n: langSelecter(locale).index,
      newsReleases: articles.data,
    },
  };
};

export { getStaticProps };
export default Home;
