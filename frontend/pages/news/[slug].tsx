/*

  Symbol関連の情報のうち、公的な情報の取り扱いページ（インデックス側より飛んだ先のページ）

*/
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { NewsReleaseFindOneResponse } from '../../model/StrapiModel';
import { Toolbar } from '../../components/atom/Toolbar';
import { PageTitle } from '../../components/atom/Titles';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-export-i18n';
import Header from '../../components/moleculs/Header';
import Footer from '../../components/moleculs/Footer';
import strapi from '../../service/StrapiService';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import UtilService from '../../service/UtilService';
import MarkdownParser from '../../components/moleculs/MarkdownParser';

const NewsArticle: NextPage = () => {
  const [news, setNews] = useState<NewsReleaseFindOneResponse['data'] | null>(null);
  const router = useRouter();
  const { t } = useTranslation();

  // ページの起動時にニュースを取得する
  useEffect(() => {
    if (typeof window === 'object' && router.isReady && typeof router.query.slug === 'string') {
      strapi.findOneNewsRelease(router.query.slug).then((e) => {
        setNews({ ...e.data });
      });
    }
  }, [router.query]);

  if (news === null) {
    return <div />;
  }

  return (
    <div style={{ marginBottom: '5vh' }}>
      <Container maxWidth="lg" style={{ height: '100%' }}>
        <Header />
        <Toolbar />
        <div
          style={{ marginTop: '10px', display: 'flex', flexWrap: 'nowrap', justifyContent: 'flex-start', gap: '10px' }}
        >
          <Typography color="text.secondary">{t('news_article.author')}</Typography>
          <Typography color="text.secondary">{'Symbol address'}</Typography>
        </div>
        <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'flex-start', gap: '10px' }}>
          <Typography color="text.secondary">{t('news_article.published')}</Typography>
          <Typography color="text.secondary">
            {UtilService.formatDate(new Date(news.attributes.publishedAt), 'yyyy/MM/dd')}
          </Typography>
          <Typography color="text.secondary">{t('news_article.updated')}</Typography>
          <Typography color="text.secondary">
            {UtilService.formatDate(new Date(news.attributes.updatedAt), 'yyyy/MM/dd')}
          </Typography>
        </div>
        <PageTitle>{news.attributes.title}</PageTitle>
        <MarkdownParser markdown={news.attributes.body} />
        <div style={{ height: '10vh' }} />
        <Footer />
      </Container>
    </div>
  );
};

export default NewsArticle;
