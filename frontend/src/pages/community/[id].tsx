import ArticleTemplate from '@/components/template/Article';
import { CommunityReleaseFindOneResponse } from '@/types/StrapiModel';
import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next/types';
import { findOneCommunityRelease } from '@/services/StrapiService';
import Toolbar from '@mui/material/Toolbar';
import Header from '@/components/moleculs/Header';

interface ArticleIdByLanguage {
  lang: string;
  id: number;
}

interface Props {
  article: CommunityReleaseFindOneResponse['data'];
  articleIdByLanguage: ArticleIdByLanguage[];
}

/** get news article */
const CommunityArticle: NextPage<Props> = ({ article, articleIdByLanguage }) => {
  if (!article) {
    return <></>;
  }

  return (
    <>
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_SITE_NAME}: ${article?.attributes.title ?? 'Community'}`}</title>
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
      <ArticleTemplate article={article} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  try {
    const article = await findOneCommunityRelease(query.id as string, { isIncludeMedia: true });
    const articleIdByLanguage: ArticleIdByLanguage[] = await Promise.all(
      article.data.attributes.localizations.data.map(async (e) => {
        return {
          lang: e.attributes.locale,
          id: e.id,
        };
      })
    );
    return {
      props: {
        article: article.data,
        articleIdByLanguage,
      },
    };
  } catch (_) {
    return {
      props: {} as any,
      redirect: {
        destination: '/community',
      },
    };
  }
};

export default CommunityArticle;
