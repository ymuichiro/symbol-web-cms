/*

  特に新参者向けにウォレットの選び方や詐欺情報等を掲載するページ（インデックス側ページ）

*/
import type { NextPage } from 'next';
import { Toolbar } from '../components/atom/Toolbar';
import { useEffect, useState } from 'react';
import { PageTitle } from '../components/atom/Titles';
import { CommunityReleaseFindResponse } from '../model/StrapiModel';
import Header from '../components/moleculs/Header';
import Footer from '../components/moleculs/Footer';
import Container from '@mui/material/Container';
import strapi from '../service/StrapiService';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { OutlinedInput } from '@mui/material';
import { useTranslation } from 'next-export-i18n';
import { isLanguageByQuery } from '../i18n/isLanguageByQuery';
import { useLanguageQuery } from '../hooks/useLanguageQuery';

const Docs: NextPage = () => {
  const [docs, setDocs] = useState<CommunityReleaseFindResponse['data']>([]);
  const [search, setSearch] = useState<string>('');
  const router = useRouter();
  const { t } = useTranslation();
  const languageQuery = useLanguageQuery(router);

  // ページの起動時にニュースを取得する
  useEffect(() => {
    if (typeof window === 'object' && router.isReady) {
      strapi.findDocuments(isLanguageByQuery(languageQuery.lang)).then((e) => {
        setDocs([...e.data]);
      });
    }
  }, [router.query]);

  return (
    <div style={{ marginBottom: '5vh' }}>
      <Container maxWidth="lg" style={{ height: '100%' }}>
        <Header />
        <Toolbar />
        <section style={{ marginTop: '10vh' }}>
          <PageTitle>{t('docs.section_title_wellcom')}</PageTitle>
          <Typography gutterBottom variant="h5" fontWeight={'bold'} style={{ marginTop: '2rem' }}>
            {t('docs.advice_private_key')}
          </Typography>
          <Typography gutterBottom variant="body1">
            ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入
            ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入
            ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入
            ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入
          </Typography>
          <Typography gutterBottom variant="h5" fontWeight={'bold'} style={{ marginTop: '2rem' }}>
            {t('docs.advice_1')}
          </Typography>
          <Typography gutterBottom variant="body1">
            ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入
            ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入
            ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入
            ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入 ここに説明を挿入
          </Typography>
          <Typography gutterBottom variant="h5" fontWeight={'bold'} style={{ marginTop: '2rem' }}>
            {t('docs.advice_2')}
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
                {t('docs.section_search_article')}
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ maxWidth: '800px', width: '100%', marginTop: '3rem', marginBottom: '6rem' }}>
                <OutlinedInput
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.currentTarget.value)}
                  type="text"
                  placeholder={t('docs.search_bar_placeholder')}
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
            {docs.length === 0 && <Typography align="left">{t('docs.no_articles')}</Typography>}
            {docs.map((item, index) => (
              <ListItemButton
                divider
                key={index}
                onClick={() => router.push({ pathname: `/docs/${item.id}`, query: languageQuery })}
              >
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

export default Docs;
