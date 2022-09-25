/*

  特に新参者向けにウォレットの選び方や詐欺情報等を掲載するページ（インデックス側ページ）

*/
import type { NextPage } from 'next';
import { Toolbar } from '../components/atom/Toolbar';
import { useEffect, useState } from 'react';
import { PageTitle, SectionTitle } from '../components/atom/Titles';
import { CommunityReleaseFindResponse } from '../model/StrapiModel';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import { i18n, en, ja } from '../i18n';
import Header from '../components/moleculs/Header';
import Footer from '../components/moleculs/Footer';
import MainBackground from '../components/atom/MainBackground';
import strapi from '../service/StrapiService';
import OutlinedInput from '@mui/material/OutlinedInput';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import Card from '@mui/material/Card';
import { CardContent } from '@mui/material';
import LinkButton from '../components/atom/LinkButton';

type Props = {
  i18nText: i18n;
};

const Docs: NextPage<Props> = ({ i18nText }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'));
  const [docs, setDocs] = useState<CommunityReleaseFindResponse['data']>([]);
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'object' && router.isReady) {
      strapi.findDocuments(router.locale).then((e) => {
        setDocs([...e.data]);
      });
    }
  }, [router.query]);

  return (
    <div style={{ marginBottom: '5vh' }}>
      <Container maxWidth="lg" style={{ height: '100%' }}>
        <Header />
        <MainBackground />
        <Toolbar />
        <section>
          <Grid container spacing={1} style={{ height: '70vh' }}>
            <Grid item xs={12} sm={12} md={1}></Grid>
            <Grid item xs={12} sm={12} md={6}>
              <div style={{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'center' }}>
                <PageTitle style={{ textAlign: matches ? 'center' : 'left' }}>{i18nText.docs.page_title}</PageTitle>
                <Typography variant="body1" style={{ textAlign: matches ? 'center' : 'left' }}>
                  {i18nText.docs.page_title_description}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <img
                  src="/assets/img/reshot-icon-learning-pencil-3XVRBFWH7A.svg"
                  alt="reshot icon"
                  style={{ maxWidth: '300px' }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={1}></Grid>
          </Grid>
        </section>
        <section>
          <Card style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <Grid container direction="column" spacing={5}>
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
                    <SectionTitle>{i18nText.docs.section_title_wellcom}</SectionTitle>
                    <Typography gutterBottom variant="body1">
                      {i18nText.docs.section_title_wellcom_body}
                    </Typography>
                  </div>
                </Grid>
                {[
                  {
                    title: i18nText.docs.advice_title1,
                    body: i18nText.docs.advice_body1,
                    buttons: [
                      {
                        title: i18nText.docs.advice_button1_1,
                        link: i18nText.docs.advice_button1_1_link,
                      },
                      {
                        title: i18nText.docs.advice_button1_2,
                        link: i18nText.docs.advice_button1_2_link,
                      },
                    ],
                  },
                  {
                    title: i18nText.docs.advice_title2,
                    body: i18nText.docs.advice_body2,
                    buttons: [
                      {
                        title: i18nText.docs.advice_button2_1,
                        link: i18nText.docs.advice_button2_1_link,
                      },
                    ],
                  },
                  {
                    title: i18nText.docs.advice_title3,
                    body: i18nText.docs.advice_body3,
                    buttons: [
                      {
                        title: i18nText.docs.advice_button3_1,
                        link: i18nText.docs.advice_button3_1_link,
                      },
                    ],
                  },
                  {
                    title: i18nText.docs.advice_title4,
                    body: i18nText.docs.advice_body4,
                    buttons: [
                      {
                        title: i18nText.docs.advice_button4_1,
                        link: i18nText.docs.advice_button4_1_link,
                      },
                      {
                        title: i18nText.docs.advice_button4_2,
                        link: i18nText.docs.advice_button4_2_link,
                      },
                    ],
                  },
                  {
                    title: i18nText.docs.advice_title5,
                    body: i18nText.docs.advice_body5,
                    buttons: [
                      {
                        title: i18nText.docs.advice_button5_1,
                        link: i18nText.docs.advice_button5_1_link,
                      },
                      {
                        title: i18nText.docs.advice_button5_2,
                        link: i18nText.docs.advice_button5_2_link,
                      },
                      {
                        title: i18nText.docs.advice_button5_3,
                        link: i18nText.docs.advice_button5_3_link,
                      },
                    ],
                  },
                ].map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      fontWeight={'bold'}
                      style={{ marginTop: '2rem', color: theme.palette.primary.main }}
                    >
                      {item.title}
                    </Typography>
                    <Typography gutterBottom variant="body1">
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
        <section style={{ marginTop: '10vh' }}>
          <Grid container spacing={5} style={{ marginTop: '5vh' }}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" fontWeight={'bold'} align="center">
                {i18nText.docs.section_search_article}
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ maxWidth: '800px', width: '100%', marginTop: '3rem', marginBottom: '6rem' }}>
                <OutlinedInput
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.currentTarget.value)}
                  type="text"
                  placeholder={i18nText.docs.search_bar_placeholder}
                  endAdornment={
                    <InputAdornment position="end">
                      <Button variant="contained">
                        <SearchIcon />
                      </Button>
                    </InputAdornment>
                  }
                />
              </div>
            </Grid>
          </Grid>
          <List>
            {docs.length === 0 && <Typography align="left">{i18nText.docs.no_articles}</Typography>}
            {docs.map((item, index) => (
              <ListItemButton divider key={index} onClick={() => router.push({ pathname: `/docs/${item.id}` })}>
                <ListItemText primary={item.attributes.title} secondary={item.attributes.description} />
              </ListItemButton>
            ))}
          </List>
        </section>
        <section style={{ marginTop: '10vh' }}>
          <Footer />
        </section>
      </Container>
    </div>
  );
};

export function getStaticProps({ locale }: any) {
  const i18nText = locale === 'en-US' ? en : ja;
  return { props: { i18nText } };
}

export default Docs;
