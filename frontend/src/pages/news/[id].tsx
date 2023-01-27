import ArticleTemplate from '@/components/template/Article';
import { NewsReleaseFindOneResponse } from '@/types/StrapiModel';
import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next/types';
import { findOneNewsRelease } from '@/services/StrapiService';
import Toolbar from '@mui/material/Toolbar';
import Header from '@/components/moleculs/Header';

interface ArticleIdByLanguage {
  lang: string;
  id: number;
}

interface Props {
  article: NewsReleaseFindOneResponse['data'];
  articleIdByLanguage: ArticleIdByLanguage[];
  locale: string;
}

/** get news article */
const NewsArticle: NextPage<Props> = ({ article, articleIdByLanguage, locale }) => {
  if (!article) {
    return <></>;
  }

  return (
    <>
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_SITE_NAME}: ${article?.attributes.title ?? 'News'}`}</title>
        <meta name='description' content={article?.attributes.body.slice(0, 200)} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={article.attributes.title} />
        <meta name='twitter:description' content={article?.attributes.body.slice(0, 200)} />
        <meta
          name='twitter:image'
          content={
            `${process.env.NEXT_PUBLIC_API_URL}${article.attributes.headerImage?.data.attributes.url}` ||
            '/twitter-card.png'
          }
        />
      </Head>
      <Header articleIdByLanguage={articleIdByLanguage} />
      <Toolbar style={{ marginTop: '20px' }} />
      <ArticleTemplate article={article} locale={locale} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ query, locale, defaultLocale }) => {
  try {
    const article = await findOneNewsRelease(query.id as string, { isIncludeMedia: true });
    const articleIdByLanguage: ArticleIdByLanguage[] = await Promise.all(
      article.data.attributes.localizations.data.map(async (e) => {
        return {
          locale: locale || defaultLocale || 'en',
          lang: e.attributes.locale,
          id: e.id,
        };
      })
    );
    return {
      props: {
        locale: locale || defaultLocale || 'en',
        article: article.data,
        articleIdByLanguage,
      },
    };
  } catch (_) {
    return {
      props: {} as any,
      redirect: {
        destination: '/news',
      },
    };
  }
};

export default NewsArticle;
