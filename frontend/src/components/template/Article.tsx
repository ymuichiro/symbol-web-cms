/*

  特に新参者向けにウォレットの選び方や詐欺情報等を掲載するページ（インデックス側から飛んだ先のページ）

*/
import { PageTitle } from '@/components/atom/Titles';
import { Toolbar } from '@/components/atom/Toolbar';
import Footer from '@/components/moleculs/Footer';
import Header from '@/components/moleculs/Header';
import MarkdownParser from '@/components/moleculs/MarkdownParser';
import { formatDate } from '@/services/UtilService';
import { NewsReleaseFindOneResponse } from '@/types/StrapiModel';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

interface ArticleTemplateArgs {
  article: NewsReleaseFindOneResponse['data'] | null;
}

/**
 * template of each article page
 */
function ArticleTemplate({ article }: ArticleTemplateArgs): JSX.Element {
  // Loading...
  if (article === null) {
    return (
      <div style={{ height: '60vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress size={100} />
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '5vh' }}>
      <Container maxWidth='lg' style={{ height: '100%' }}>
        <Header />
        <Toolbar />
        <div style={{ paddingTop: '0.5em', paddingBottom: '0.5em' }}>
          <Typography color='text.secondary' textAlign='right'>
            Update {formatDate(new Date(article.attributes.updatedAt), 'yyyy/MM/dd')}
          </Typography>
        </div>
        <Container maxWidth='md' style={{ wordWrap: 'break-word' }}>
          <PageTitle>{article.attributes.title}</PageTitle>
          <div style={{ height: '1rem' }} />
          <MarkdownParser markdown={article.attributes.body} />
          <div style={{ height: '10vh' }} />
        </Container>
        <Divider />
        <Footer />
      </Container>
    </div>
  );
}

export default ArticleTemplate;
