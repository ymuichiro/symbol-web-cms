/*

  コミュニティの情報を表示するページ（インデックスページから飛んだ先）

*/
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { CommunityReleaseFindOneResponse } from '../../model/StrapiModel';
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

const CommunityArticle: NextPage = () => {
  const [article, setArticle] = useState<CommunityReleaseFindOneResponse['data'] | null>(null);
  const router = useRouter();
  const { t } = useTranslation();

  // ページの起動時にニュースを取得する
  useEffect(() => {
    if (typeof window === 'object' && router.isReady && typeof router.query.slug === 'string') {
      strapi.findOneCommunityRelease(router.query.slug).then((e) => {
        setArticle({ ...e.data });
      });
    }
  }, [router.query]);

  if (article === null) {
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
          <Typography color="text.secondary">{t('community_article.author')}</Typography>
          <Typography color="text.secondary">{'Symbol address'}</Typography>
        </div>
        <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'flex-start', gap: '10px' }}>
          <Typography color="text.secondary">{t('community_article.published')}</Typography>
          <Typography color="text.secondary">
            {UtilService.formatDate(new Date(article.attributes.publishedAt), 'yyyy/MM/dd')}
          </Typography>
          <Typography color="text.secondary">{t('community_article.updated')}</Typography>
          <Typography color="text.secondary">
            {UtilService.formatDate(new Date(article.attributes.updatedAt), 'yyyy/MM/dd')}
          </Typography>
        </div>
        <PageTitle>{article.attributes.title}</PageTitle>
        <MarkdownParser markdown={article.attributes.body} />
        <div style={{ height: '10vh' }} />
        <Footer />
      </Container>
    </div>
  );
};

export default CommunityArticle;
