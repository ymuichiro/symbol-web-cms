import IconSelection from '@/assets/icon/selection.svg';
import LinkButton from '@/components/atom/LinkButton';
import MainBackground from '@/components/atom/MainBackground';
import { PageTitle, SubTitle } from '@/components/atom/Titles';
import Footer from '@/components/moleculs/Footer';
import Header from '@/components/moleculs/Header';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import { GetStaticProps, NextPage } from 'next/types';

const SymbolPollHome: NextPage = ({}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'));

  return (
    <>
      <Header />
      <Toolbar style={{ marginTop: '20px' }} />
      <div style={{ marginBottom: '5vh' }}>
        <Container maxWidth='lg' style={{ height: '100%' }}>
          {/* ヘッダーセクション */}
          <section>
            <MainBackground />
            <Grid container spacing={1} style={{ height: '70vh' }}>
              <Grid item xs={12} sm={12} md={1}></Grid>
              <Grid item xs={12} sm={12} md={6}>
                <div style={{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'center' }}>
                  <PageTitle style={{ textAlign: matches ? 'center' : 'left' }}>Symbol Importance Poll</PageTitle>
                  <Typography variant='body1' style={{ textAlign: matches ? 'center' : 'left' }}>
                    Let&apos;s all show our will. Let&apos;s make our own choices.
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <Image height={150} width={150} src={IconSelection} alt='community icon' />
                </div>
              </Grid>
            </Grid>
          </section>
          <section>
            <Grid container spacing={3} style={{ marginBottom: '30vh' }}>
              <Grid item xs={12}>
                <SubTitle align='center' style={{ marginTop: '1rem' }}>
                  Start Polling
                </SubTitle>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '3rem',
                }}
              >
                <Typography variant='h5' align='center' fontWeight='bold'>
                  Create a New Poll
                </Typography>
                <LinkButton
                  isNewTab={false}
                  size='large'
                  href='/symbol-poll/create'
                  style={{
                    background: `linear-gradient(to right bottom, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                    color: 'white',
                    padding: '0.5rem 2rem 0.5rem 2rem',
                    fontWeight: 'bold',
                  }}
                >
                  go to create page
                </LinkButton>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '3rem' }}
              >
                <Typography variant='h5' align='center' fontWeight='bold'>
                  Join a Poll
                </Typography>
                <LinkButton
                  isNewTab={false}
                  size='large'
                  href='/symbol-poll/poll'
                  style={{
                    background: `linear-gradient(to right bottom, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                    color: 'white',
                    padding: '0.5rem 2rem 0.5rem 2rem',
                    fontWeight: 'bold',
                  }}
                >
                  go to create page
                </LinkButton>
              </Grid>
            </Grid>
          </section>
          <section style={{ marginTop: '100px' }}>
            <Footer />
          </section>
        </Container>
      </div>
    </>
  );
};

const getStaticProps: GetStaticProps = async ({ locale, defaultLocale }) => {
  return {
    props: {
      locale: locale || defaultLocale || 'en',
    },
  };
};

export { getStaticProps };
export default SymbolPollHome;
