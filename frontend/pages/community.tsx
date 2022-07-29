/*

  コミュニティの情報を表示するページ（ページインデックスの表示ページ）

*/
import type { NextPage } from 'next';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../components/moleculs/Header';
import Footer from '../components/moleculs/Footer';
import { useLocale } from '../hooks/useLocale';

const Community: NextPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'));
  const { t, locale } = useLocale();

  return (
    <div style={{ marginBottom: '5vh' }}>
      <Header />
      <Footer />
    </div>
  );
};

export default Community;
