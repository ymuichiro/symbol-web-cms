import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next/types';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

/**
 * 404 Error page
 */
function ErrorPage(): JSX.Element {
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_SITE_NAME}: page not found`}</title>
        <meta name='description' content='page not found' />
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
}

// 各言語別に SSG する
const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export { getStaticProps };
export default ErrorPage;
