/*

  Symbol関連の情報のうち、公的な情報の取り扱いページ（インデックス側より飛んだ先のページ）

*/
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { NewsReleaseFindOneResponse } from '../../model/StrapiModel';
import { Toolbar } from '../../components/atom/Toolbar';
import { PageTitle } from '../../components/atom/Titles';
import { useRouter } from 'next/router';
import Header from '../../components/moleculs/Header';
import Footer from '../../components/moleculs/Footer';
import strapi from '../../service/StrapiService';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import UtilService from '../../service/UtilService';
import MarkdownParser from '../../components/moleculs/MarkdownParser';
import Divider from '@mui/material/Divider';

const NewsArticle: NextPage = () => {
  const [news, setNews] = useState<NewsReleaseFindOneResponse['data'] | null>(null);
  const router = useRouter();

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
        <div style={{ paddingTop: '0.5em', paddingBottom: '0.5em' }}>
          <Typography color="text.secondary" textAlign="right">
            Update {UtilService.formatDate(new Date(news.attributes.updatedAt), 'yyyy/MM/dd')}
          </Typography>
        </div>
        <PageTitle>{news.attributes.title}</PageTitle>
        <MarkdownParser markdown={news.attributes.body} />
        <div style={{ height: '10vh' }} />
        <Divider />
        <Divider />
        <Footer />
      </Container>
    </div>
  );
};

export default NewsArticle;
