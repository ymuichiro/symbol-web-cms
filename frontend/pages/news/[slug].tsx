/*

  Symbol関連の情報のうち、公的な情報の取り扱いページ（インデックス側より飛んだ先のページ）

*/
import type { NextPage } from 'next';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/moleculs/Header';
import Footer from '../../components/moleculs/Footer';

const NewsArticle: NextPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'));

  return (
    <div style={{ marginBottom: '5vh' }}>
      <Header />
      <Footer />
    </div>
  );
};

export default NewsArticle;
