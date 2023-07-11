import TomatinaTwitterHeader from '@/assets/background/symbol-tomatina-header.png';
import TomatoFaceImage from '@/assets/background/tomato-face.png';
import TomatoImage from '@/assets/background/tomato.png';
import LinkButton from '@/components/atom/LinkButton';
import Footer from '@/components/moleculs/Footer';
import Header from '@/components/moleculs/Header';
import MediaCard from '@/components/moleculs/MediaCard';
import { lang, langSelecter } from '@/languages';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps, NextPage } from 'next/types';

interface Props {
  i18n: lang['index'];
}

const Home: NextPage<Props> = ({ i18n }) => {
  return (
    <>
      <Head>
        <title>{i18n.meta_page_title}</title>
        <meta name='description' content={'Symbol トマティーナのイベントページです'} />
        <meta name='twitter:title' content={'Symbol トマティーナ'} />
        <meta name='twitter:description' content={'Symbol トマティーナのイベントページです'} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:image' content={`${process.env.NEXT_PUBLIC_HOSTING_URL}${TomatinaTwitterHeader.src}`} />
      </Head>
      <Header />
      <Toolbar style={{ marginTop: '20px' }} />
      <div
        style={{
          position: 'absolute',
          top: 0,
          height: '100svh',
          width: '100%',
          maxWidth: '1000px',
          zIndex: -1,
          backgroundImage: `url(${TomatoImage.src})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(40%)',
          backgroundPosition: 'center bottom',
        }}
      />
      <Container maxWidth='lg' style={{ marginBottom: '5vh' }}>
        <div
          style={{
            height: '80svh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginBottom: '20svh',
          }}
        >
          <Typography
            variant='h1'
            fontWeight='bold'
            textAlign='center'
            gutterBottom
            sx={{ fontSize: { xs: '3rem', sm: '6rem', md: '8rem', lg: '10rem' } }}
          >
            Symbol Tomatina
          </Typography>
          <Typography variant='h5' fontWeight='bold' textAlign='center'>
            熱したデジタルトマトをぶつけ合おう
          </Typography>
        </div>
        <Typography variant='h4' fontWeight={'bold'} gutterBottom>
          デジタルトマトをぶつけまくる
        </Typography>
        <Grid container spacing={3} alignItems={'center'} style={{ minHeight: '50svh' }}>
          <Grid item xs={12} md={7}>
            <Typography variant='body1' style={{ marginBottom: '1rem' }}>
              このイベントでは期間限定でトマトを模したデジタルトークンが発行され、無料にて配布されます。配布されたデジタルトマトトークンを使って見知らぬ誰かにブロックチェーンのトランザクションとして投げつけたり、トマトを投げつけるようなゲームをプレイする事ができます。
            </Typography>
            <LinkButton
              href='https://docs.symbol.dev/ja/concepts/mosaic.html'
              ariaLabel='mosaic link'
              isNewTab
              variant='outlined'
              sx={{ width: { xs: '100%', sm: '300px', md: '300px' } }}
            >
              デジタルトークンについて知る
            </LinkButton>
          </Grid>
          <Grid item xs={12} md={5}>
            <div style={{ width: '100%', textAlign: 'center', marginTop: '5svh', marginBottom: '5svh' }}>
              <Image src={TomatoFaceImage} height={300} width={300} alt='tomato image' />
            </div>
          </Grid>
        </Grid>
        <div style={{ height: '5svh' }} />
        <Typography variant='h4' fontWeight={'bold'} textAlign={'center'} gutterBottom>
          以前の開催の様子
        </Typography>
        <Grid container spacing={3} alignItems={'center'} style={{ minHeight: '50svh' }}>
          <Grid item xs={12} md={4}>
            <Typography variant='body1' style={{ marginBottom: '1rem' }}>
              オンラインでトマトをぶつけあうゲームをプレイしたり、RPGゲーム等が公開されました。
              トマトを投げると実際にトランザクションが作成され、ブロックチェーン上に結果が記録されるブロックチェーンゲームです。
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <div style={{ width: '100%', textAlign: 'center', marginTop: '5svh', marginBottom: '5svh' }}>
              <iframe
                width='560'
                height='315'
                src='https://www.youtube.com/embed/mebNYjgFMms'
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                allowFullScreen={true}
                style={{ border: 0 }}
              ></iframe>
            </div>
          </Grid>
        </Grid>
        <div style={{ height: '5svh' }} />
        <Typography variant='h4' fontWeight={'bold'} gutterBottom>
          ゲーム楽しもう
        </Typography>
        <Typography variant='body1' style={{ marginBottom: '1rem' }}>
          現在公開されているゲームを掲載しております。プレイ方法、ルールなどは各ゲームのページをご覧ください。
        </Typography>
        <Grid container spacing={3} alignItems={'center'}>
          <Grid item xs={12} sm={6} md={4}>
            <MediaCard title='準備中' date={'2023/07/20'} description='準備中' locale={'ja'} image={TomatoImage.src} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <MediaCard title='準備中' date={'2023/07/20'} description='準備中' locale={'ja'} image={TomatoImage.src} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <MediaCard title='準備中' date={'2023/07/20'} description='準備中' locale={'ja'} image={TomatoImage.src} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <MediaCard title='準備中' date={'2023/07/20'} description='準備中' locale={'ja'} image={TomatoImage.src} />
          </Grid>
        </Grid>
      </Container>
      <Card style={{ marginTop: '10svh', width: '100%', borderRadius: 0, paddingTop: '5svh', paddingBottom: '5svh' }}>
        <Container maxWidth={'lg'}>
          <Typography variant='h4' fontWeight={'bold'} gutterBottom>
            開催概要
          </Typography>
          <Typography variant='body1' style={{ marginBottom: '1rem' }}>
            2023年度 Symbol Tomatina の開催概要を掲載します。（準備中）
          </Typography>
          <Grid container alignItems={'center'}>
            <Grid item xs={12} md={6}>
              <List style={{ flexGrow: 1 }} disablePadding>
                <ListItem>
                  <ListItemText primary='開催日時' secondary='毎年８月最終水曜日' />
                </ListItem>
                <ListItem>
                  <ListItemText primary='開催場所' secondary='Twitter等' />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <List style={{ flexGrow: 1 }} disablePadding>
                <ListItem>
                  <ListItemText
                    primary='問い合わせ'
                    secondary={
                      <Link href={'https://discord.gg/TT2tvxFfN4'} style={{ color: 'white' }}>
                        Symbol/NEM Marketing
                      </Link>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary='Tomato Mosaic ID' secondary='各自自由に発行' />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Container>
      </Card>
      <section style={{ marginTop: '100px' }}>
        <Container maxWidth={'lg'}>
          <Footer />
        </Container>
      </section>
    </>
  );
};

const getStaticProps: GetStaticProps<Props> = async ({ locale, defaultLocale }) => {
  return {
    props: {
      i18n: langSelecter(locale).index,
    },
  };
};

export { getStaticProps };
export default Home;
