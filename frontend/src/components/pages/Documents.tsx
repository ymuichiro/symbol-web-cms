/*

  特に新参者向けにウォレットの選び方や詐欺情報等を掲載するページ（インデックス側ページ）

*/
import LinkButton from '@/components/atom/LinkButton';
import MainBackground from '@/components/atom/MainBackground';
import { PageTitle, SectionTitle } from '@/components/atom/Titles';
import { Toolbar } from '@/components/atom/Toolbar';
import Footer from '@/components/moleculs/Footer';
import Header from '@/components/moleculs/Header';
import { findDocuments } from '@/services/StrapiService';
import { CommunityReleaseFindResponse } from '@/types/StrapiModel';
import { CardContent } from '@mui/material';
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
import { useTranslation } from 'react-i18next';
import { IoSearchOutline } from 'react-icons/io5';
import learningPencil from '@/assets/icon/learning-pencil.svg';
import { Helmet } from 'react-helmet-async';

function Documents(): JSX.Element {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'));
  const [docs, setDocs] = useState<CommunityReleaseFindResponse['data']>([]);
  const [search, setSearch] = useState<string>('');
  const { t, i18n } = useTranslation(['docs']);

  // ページの起動時にドキュメントを取得する
  useEffect(() => {
    findDocuments(i18n.language, { isIncludeMedia: true })
      .then((e) => setDocs([...e.data]))
      .catch(console.error);
  }, [i18n.language]);

  const onSearchDocuments = (): void => {
    findDocuments(i18n.language, { isIncludeMedia: true, keywords: search.split(/\s/) })
      .then((e) => setDocs([...e.data]))
      .catch(console.error);
  };

  return (
    <>
      <Helmet>
        <title>{`${import.meta.env.VITE_SITE_NAME}: Documents`}</title>
      </Helmet>
      <div style={{ marginBottom: '5vh' }}>
        <Container maxWidth='lg' style={{ height: '100%' }}>
          <Header />
          <MainBackground />
          <Toolbar />
          <section>
            <Grid container spacing={1} style={{ height: '70vh' }}>
              <Grid item xs={12} sm={12} md={1}></Grid>
              <Grid item xs={12} sm={12} md={6}>
                <div style={{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'center' }}>
                  <PageTitle style={{ textAlign: matches ? 'center' : 'left' }}>{t('docs:page_title')}</PageTitle>
                  <Typography variant='body1' style={{ textAlign: matches ? 'center' : 'left' }}>
                    {t('docs:page_title_description')}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={learningPencil} alt='document icon' style={{ width: '80%', maxWidth: '300px' }} />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={1}></Grid>
            </Grid>
          </section>
          <section>
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
                      <SectionTitle>{t('docs:section_title_wellcom')}</SectionTitle>
                      <Typography gutterBottom variant='body1'>
                        {t('docs:section_title_wellcom_body')}
                      </Typography>
                    </div>
                  </Grid>
                  {[
                    {
                      title: t('docs:advice_title1'),
                      body: t('docs:advice_body1'),
                      buttons: [
                        {
                          title: t('docs:advice_button1_1'),
                          link: t('docs:advice_button1_1_link'),
                        },
                        {
                          title: t('docs:advice_button1_2'),
                          link: t('docs:advice_button1_2_link'),
                        },
                      ],
                    },
                    {
                      title: t('docs:advice_title2'),
                      body: t('docs:advice_body2'),
                      buttons: [
                        {
                          title: t('docs:advice_button2_1'),
                          link: t('docs:advice_button2_1_link'),
                        },
                      ],
                    },
                    {
                      title: t('docs:advice_title3'),
                      body: t('docs:advice_body3'),
                      buttons: [
                        {
                          title: t('docs:advice_button3_1'),
                          link: t('docs:advice_button3_1_link'),
                        },
                      ],
                    },
                    {
                      title: t('docs:advice_title4'),
                      body: t('docs:advice_body4'),
                      buttons: [
                        {
                          title: t('docs:advice_button4_1'),
                          link: t('docs:advice_button4_1_link'),
                        },
                        {
                          title: t('docs:advice_button4_2'),
                          link: t('docs:advice_button4_2_link'),
                        },
                      ],
                    },
                    {
                      title: t('docs:advice_title5'),
                      body: t('docs:advice_body5'),
                      buttons: [
                        {
                          title: t('docs:advice_button5_1'),
                          link: t('docs:advice_button5_1_link'),
                        },
                        {
                          title: t('docs:advice_button5_2'),
                          link: t('docs:advice_button5_2_link'),
                        },
                        {
                          title: t('docs:advice_button5_3'),
                          link: t('docs:advice_button5_3_link'),
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
          </section>

          {/* 検索セクション */}
          <section style={{ marginTop: '10vh' }}>
            <Container maxWidth='md'>
              <Grid container spacing={5} style={{ marginTop: '5vh' }}>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h5' fontWeight={'bold'} align='center'>
                    {t('docs:section_search_article')}
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '100%', marginTop: '3rem', marginBottom: '6rem' }}>
                    <OutlinedInput
                      fullWidth
                      value={search}
                      onChange={(e) => setSearch(e.currentTarget.value)}
                      type='text'
                      placeholder={t('docs:search_bar_placeholder')}
                      endAdornment={
                        <InputAdornment position='end'>
                          <Button variant='contained' onClick={onSearchDocuments}>
                            <IoSearchOutline size='100' />
                          </Button>
                        </InputAdornment>
                      }
                    />
                  </div>
                </Grid>
              </Grid>
              <List>
                {docs.length === 0 && <Typography align='left'>{t('docs:no_articles')}</Typography>}
                {docs.map((item, index) => (
                  <ListItemButton LinkComponent={'a'} divider key={index} href={`/docs/${item.id}`}>
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
}

export default Documents;
