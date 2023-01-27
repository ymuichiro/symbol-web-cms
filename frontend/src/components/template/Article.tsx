/*

  特に新参者向けにウォレットの選び方や詐欺情報等を掲載するページ（インデックス側から飛んだ先のページ）

*/
import { PageTitle } from '@/components/atom/Titles';
import Footer from '@/components/moleculs/Footer';
import MarkdownParser from '@/components/moleculs/MarkdownParser';
import { NewsReleaseFindOneResponse } from '@/types/StrapiModel';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

interface ArticleTemplateArgs {
  locale: string;
  article: NewsReleaseFindOneResponse['data'];
}

/**
 * template of each article page
 */
function ArticleTemplate({ article, locale }: ArticleTemplateArgs): JSX.Element {
  return (
    <div style={{ marginBottom: '5vh' }}>
      <Container maxWidth='lg' style={{ height: '100%' }}>
        <div style={{ paddingTop: '0.5em', paddingBottom: '0.5em' }}>
          <Typography color='text.secondary' textAlign='right'>
            Update {new Date(article.attributes.updatedAt).toLocaleDateString(locale, { timeZone: 'Asia/Tokyo' })}
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
