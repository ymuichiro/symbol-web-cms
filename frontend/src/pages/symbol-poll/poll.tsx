import MainBackground from '@/components/atom/MainBackground';
import { PageTitle, SectionTitle, SubTitle } from '@/components/atom/Titles';
import Header from '@/components/moleculs/Header';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { GetStaticProps, NextPage } from 'next/types';
import Image from 'next/image';
import IconSelection from '@/assets/icon/selection.svg';
import LinkButton from '@/components/atom/LinkButton';
import Footer from '@/components/moleculs/Footer';

interface Props {}

const SymbolPoll: NextPage<Props> = ({}) => {
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
            <PageTitle>Join a Poll</PageTitle>
            ここに投票内容<br></br> 投票開始を押したらSSSで投票かQRを表示してモバイルWalletから投票できるといいかも？
          </section>
          <section style={{ marginTop: '100px' }}>
            <Footer />
          </section>
        </Container>
      </div>
    </>
  );
};

const getStaticProps: GetStaticProps<Props> = async ({ locale, defaultLocale }) => {
  return {
    props: {
      locale: locale || defaultLocale || 'en',
    },
  };
};

export { getStaticProps };
export default SymbolPoll;