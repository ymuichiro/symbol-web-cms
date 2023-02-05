import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps, NextPage } from 'next/types';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

interface Props {}

/**
 * 404 Error page
 */
const ErrorPage: NextPage<Props> = ({}) => {
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>Blockchain Symbol Community | Error</title>
        <meta name='description' content={'page not found'} />
        <meta name='twitter:title' content={'Blockchain Symbol Community | Error'} />
        <meta name='twitter:description' content={'page not found'} />
      </Head>
      <div
        style={{
          height: '80vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '30px',
        }}
      >
        <Typography variant='h4' component='h1' align='center' fontWeight='bold'>
          Page not found
        </Typography>
        <Link href={'/'} style={{ textDecoration: 'none', color: theme.palette.primary.main, ...theme.typography.h5 }}>
          &gt;&gt; Home
        </Link>
      </div>
    </>
  );
};

// 各言語別に SSG する
const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export { getStaticProps };
export default ErrorPage;
