/*

  特に新参者向けにウォレットの選び方や詐欺情報等を掲載するページ（インデックス側ページ）

*/
import type { NextPage } from 'next';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../components/moleculs/Header';
import Footer from '../components/moleculs/Footer';
import { useContext } from 'react';
import { SystemContext } from '../context';

const Docs: NextPage = () => {
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

export default Docs;
