/*

  特に新参者向けにウォレットの選び方や詐欺情報等を掲載するページ（インデックス側ページ）

*/
import type { NextPage } from 'next';
import { Toolbar } from '../components/atom/Toolbar';
import { useEffect, useState } from 'react';
import { PageTitle } from '../components/atom/Titles';
import { CommunityReleaseFindResponse } from '../model/StrapiModel';
import { useRouter } from 'next/router';
import { OutlinedInput } from '@mui/material';
import { i18n, en, ja } from '../i18n';
import Header from '../components/moleculs/Header';
import Footer from '../components/moleculs/Footer';
import Container from '@mui/material/Container';
import strapi from '../service/StrapiService';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import MainBackground from '../components/atom/MainBackground';

type Props = {
  i18nText: i18n;
};

const Docs: NextPage<Props> = ({ i18nText }) => {
  const [docs, setDocs] = useState<CommunityReleaseFindResponse['data']>([]);
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  // ページの起動時にニュースを取得する
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
        <section style={{ marginTop: '10vh' }}>
          {/* 
            contents 

            秘密鍵について
            このBlogの更新方法について
            
          */}
          <PageTitle>{i18nText.docs.section_title_wellcom}</PageTitle>
          <Typography gutterBottom variant="h5" fontWeight={'bold'} style={{ marginTop: '2rem' }}>
            {i18nText.docs.advice_private_key}
          </Typography>
          <Typography gutterBottom variant="body1">
            ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入
            ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入
            ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入
            ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入
          </Typography>
          <Typography gutterBottom variant="h5" fontWeight={'bold'} style={{ marginTop: '2rem' }}>
            {i18nText.docs.advice_1}
          </Typography>
          <Typography gutterBottom variant="body1">
            ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入
            ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入
            ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入
            ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入
          </Typography>
          <Typography gutterBottom variant="h5" fontWeight={'bold'} style={{ marginTop: '2rem' }}>
            {i18nText.docs.advice_2}
          </Typography>
          <Typography gutterBottom variant="body1">
            ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入
            ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入
            ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入
            ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入
          </Typography>
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
