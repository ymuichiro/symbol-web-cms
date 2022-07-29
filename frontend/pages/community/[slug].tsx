/*

  コミュニティの情報を表示するページ（インデックスページから飛んだ先）

*/
import type { NextPage } from 'next';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/moleculs/Header';
import Footer from '../../components/moleculs/Footer';
import { SystemContext } from '../../context';
import { useContext } from 'react';

const CommunityArticle: NextPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'));
  const { contextState, updateContext } = useContext(SystemContext);

  return (
    <div style={{ marginBottom: '5vh' }}>
      <Header />
      <Footer />
    </div>
  );
};

export default CommunityArticle;
