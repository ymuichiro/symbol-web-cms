/*

  特に新参者向けにウォレットの選び方や詐欺情報等を掲載するページ（インデックス側ページ）

*/
import LinkButton from '@/components/atom/LinkButton';
import MainBackground from '@/components/atom/MainBackground';
import { PageTitle, SectionTitle, SubTitle } from '@/components/atom/Titles';
import Footer from '@/components/moleculs/Footer';
import { findDocuments } from '@/services/StrapiService';
import { DocumentFindResponse } from '@/types/StrapiModel';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import learningPencil from '@/assets/icon/learning-pencil.svg';
import Head from 'next/head';
import Link from 'next/link';
import { lang, langSelecter } from '@/languages';
import { GetServerSideProps, NextPage } from 'next/types';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Header from '@/components/moleculs/Header';
import Toolbar from '@mui/material/Toolbar';
import { NAVIGATIONS } from '@/types/navigations';
import ApiServerImage from '@/assets/icon/api-server.webp';

interface Props {
  i18n: lang['docs'];
  documentReleases: DocumentFindResponse['data'];
  initLocale?: string;
}

const Documents: NextPage<Props> = ({ i18n, documentReleases, initLocale }) => {
  const router = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'));
  const [docs, setDocs] = useState<DocumentFindResponse['data']>([]);
  const [search, setSearch] = useState<string>('');

  const onSearchDocuments = (): void => {
    findDocuments(router.locale, { isIncludeMedia: true, keywords: search.split(/\s/) })
      .then((e) => setDocs([...e.data]))
      .catch(console.error);
  };

  useEffect(() => {
    setDocs([...documentReleases]);
  }, [router.locale]);

  return (
    <>
      <Head>
        <title>{i18n.meta_page_title}</title>
        <meta name='description' content={i18n.meta_page_description} />
        <meta name='twitter:title' content={i18n.meta_page_title} />
        <meta name='twitter:description' content={i18n.meta_page_description} />
      </Head>
      <Header />
      <Toolbar style={{ marginTop: '20px' }} />

      <div style={{ marginBottom: '5vh' }}>
        <Container maxWidth='lg' style={{ height: '100%' }}>
          <MainBackground />
          <Grid container spacing={1} style={{ height: '70vh' }}>
            <Grid item xs={12} sm={12} md={1}></Grid>
            <Grid item xs={12} sm={12} md={6}>
              <div style={{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'center' }}>
                <PageTitle style={{ textAlign: matches ? 'center' : 'left' }}>{i18n.page_title}</PageTitle>
                <Typography variant='body1' style={{ textAlign: matches ? 'center' : 'left' }}>
                  {i18n.page_title_description}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Image height={200} width={200} src={learningPencil} alt='document icon' />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={1}></Grid>
          </Grid>
          <Card style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <Grid container direction='column' spacing={5}>
                <Grid item xs={12}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '40vh',
                    }}
                  >
                    <SectionTitle>{i18n.section_title_wellcom}</SectionTitle>
                    <Typography gutterBottom variant='body1'>
                      {i18n.section_title_wellcom_body}
                    </Typography>
                  </div>
                </Grid>
                {[
                  {
                    title: i18n.advice_title1,
                    body: i18n.advice_body1,
                    buttons: [
                      {
                        title: i18n.advice_button1_1,
                        link: i18n.advice_button1_1_link,
                      },
                      {
                        title: i18n.advice_button1_2,
                        link: i18n.advice_button1_2_link,
                      },
                    ],
                  },
                  {
                    title: i18n.advice_title2,
                    body: i18n.advice_body2,
                    buttons: [
                      {
                        title: i18n.advice_button2_1,
                        link: i18n.advice_button2_1_link,
                      },
                    ],
                  },
                  {
                    title: i18n.advice_title3,
                    body: i18n.advice_body3,
                    buttons: [
                      {
                        title: i18n.advice_button3_1,
                        link: i18n.advice_button3_1_link,
                      },
                    ],
                  },
                  {
                    title: i18n.advice_title4,
                    body: i18n.advice_body4,
                    buttons: [
                      {
                        title: i18n.advice_button4_1,
                        link: i18n.advice_button4_1_link,
                      },
                      {
                        title: i18n.advice_button4_2,
                        link: i18n.advice_button4_2_link,
                      },
                    ],
                  },
                  {
                    title: i18n.advice_title5,
                    body: i18n.advice_body5,
                    buttons: [
                      {
                        title: i18n.advice_button5_1,
                        link: i18n.advice_button5_1_link,
                      },
                      {
                        title: i18n.advice_button5_2,
                        link: i18n.advice_button5_2_link,
                      },
                      {
                        title: i18n.advice_button5_3,
                        link: i18n.advice_button5_3_link,
                      },
                    ],
                  },
                ].map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <Typography
                      gutterBottom
                      variant='h5'
                      fontWeight={'bold'}
                      style={{ marginTop: '2rem', color: theme.palette.primary.main }}
                    >
                      {item.title}
                    </Typography>
                    <Typography gutterBottom variant='body1'>
                      {item.body}
                    </Typography>
                    <Grid
                      container
                      spacing={3}
                      style={{ marginTop: '1rem', paddingLeft: '1rem', paddingRight: '1rem' }}
                    >
                      {item.buttons?.map((button, index) => (
                        <Grid item xs={12} sm={12} md={6} key={index}>
                          <LinkButton isNewTab href={button.link} fullWidth>
                            {button.title}
                          </LinkButton>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
          {/* Rest API お試しセクション */}
          <Grid container spacing={1} style={{ minHeight: matches ? undefined : '500px', marginTop: '5rem' }}>
            <Grid item xs={12} sm={12} md={6}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <SubTitle style={{ marginTop: 0 }}>Try Symbol Rest API</SubTitle>
                <Button
                  onClick={() => router.push(NAVIGATIONS.SUPPORT_REST)}
                  style={{ maxWidth: '500px', marginTop: '3rem', marginBottom: '3rem' }}
                >
                  go rest api playground
                </Button>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <Image src={ApiServerImage} height={500} width={500} alt='symbol rest api document' />
            </Grid>
          </Grid>
          {/* 検索セクション */}
          <section style={{ marginTop: '10vh' }}>
            <Container maxWidth='md'>
              <Grid container spacing={5} style={{ marginTop: '5vh' }}>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h5' fontWeight={'bold'} align='center'>
                    {i18n.section_search_article}
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '100%', marginTop: '3rem', marginBottom: '6rem' }}>
                    <OutlinedInput
                      fullWidth
                      value={search}
                      onChange={(e) => setSearch(e.currentTarget.value)}
                      type='text'
                      placeholder={i18n.search_bar_placeholder}
                      endAdornment={
                        <InputAdornment position='end'>
                          <Button size='large' variant='contained' onClick={onSearchDocuments}>
                            <IoSearchOutline />
                          </Button>
                        </InputAdornment>
                      }
                    />
                  </div>
                </Grid>
              </Grid>
              <List>
                {docs.length === 0 && <Typography align='left'>{i18n.no_articles}</Typography>}
                {docs.map((item, index) => (
                  <ListItemButton component={Link} divider key={index} href={`${NAVIGATIONS.DOCS}/${item.id}`}>
                    <ListItemText primary={item.attributes.title} secondary={item.attributes.description} />
                  </ListItemButton>
                ))}
              </List>
            </Container>
          </section>
          <section style={{ marginTop: '10vh' }}>
            <Footer />
          </section>
        </Container>
      </div>
    </>
  );
};

const getServerSideProps: GetServerSideProps<Props> = async ({ locale }) => {
  const articles = await findDocuments(locale, { isIncludeMedia: true });
  return {
    props: {
      i18n: langSelecter(locale).docs,
      documentReleases: articles.data,
      initLocale: locale,
    },
  };
};

export { getServerSideProps };
export default Documents;
