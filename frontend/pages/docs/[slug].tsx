/*

  特に新参者向けにウォレットの選び方や詐欺情報等を掲載するページ（インデックス側から飛んだ先のページ）

*/
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { DocumentFindOneResponse } from '../../model/StrapiModel';
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

const DocsArticle: NextPage = () => {
  const [doc, setDoc] = useState<DocumentFindOneResponse['data'] | null>(null);
  const router = useRouter();

  // ページの起動時にニュースを取得する
  useEffect(() => {
    if (typeof window === 'object' && router.isReady && typeof router.query.slug === 'string') {
      strapi.findOneDocuments(router.query.slug).then((e) => {
        setDoc({ ...e.data });
      });
    }
  }, [router.query]);

  if (doc === null) {
    return <div />;
  }

  return (
    <div style={{ marginBottom: '5vh' }}>
      <Container maxWidth="lg" style={{ height: '100%' }}>
        <Header />
        <Toolbar />
        <div style={{ paddingTop: '0.5em', paddingBottom: '0.5em' }}>
          <Typography color="text.secondary" textAlign="right">
            Update {UtilService.formatDate(new Date(doc.attributes.updatedAt), 'yyyy/MM/dd')}
          </Typography>
        </div>
        <Container maxWidth="md">
          <PageTitle>{doc.attributes.title}</PageTitle>
          <div style={{ height: '1rem' }} />
          <MarkdownParser markdown={doc.attributes.body} />
          <div style={{ height: '10vh' }} />
        </Container>
        <Divider />
        <Footer />
      </Container>
    </div>
  );
};

export default DocsArticle;
