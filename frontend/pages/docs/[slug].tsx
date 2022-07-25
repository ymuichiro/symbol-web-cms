/*

  特に新参者向けにウォレットの選び方や詐欺情報等を掲載するページ（インデックス側から飛んだ先のページ）

*/
import type { NextPage } from 'next';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/moleculs/Header';
import Footer from '../../components/moleculs/Footer';

const DocsArticle: NextPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'));

  return (
    <div style={{ marginBottom: '5vh' }}>
      <Header />
      <Footer />
    </div>
  );
};

export default DocsArticle;
