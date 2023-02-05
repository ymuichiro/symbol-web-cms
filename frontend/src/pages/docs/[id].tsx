import ArticleTemplate from '@/components/template/Article';
import { DocumentFindOneResponse } from '@/types/StrapiModel';
import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next/types';
import { findOneDocuments } from '@/services/StrapiService';
import Toolbar from '@mui/material/Toolbar';
import Header from '@/components/moleculs/Header';
import { NAVIGATIONS } from '@/types/navigations';
import { lang, langSelecter } from '@/languages';

interface ArticleIdByLanguage {
  lang: string;
  id: number;
}

interface Props {
  i18n: lang['common'];
  article: DocumentFindOneResponse['data'];
  articleIdByLanguage: ArticleIdByLanguage[];
  locale: string;
}

/** get news article */
const DocumsntArticle: NextPage<Props> = ({ i18n, article, articleIdByLanguage, locale }) => {
  if (!article) {
    return <></>;
  }

  return (
    <>
      <Head>
        <title>{`${i18n.meta_page_title}: ${article?.attributes.title ?? 'Documents'}`}</title>
        <meta name='description' content={article?.attributes.body.slice(0, 200) || ''} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:image' content='/twitter-card.png' />
        <meta name='twitter:title' content={article.attributes.title} />
        <meta name='twitter:description' content={article?.attributes.body.slice(0, 200) || ''} />
      </Head>
      <Header articleIdByLanguage={articleIdByLanguage} />
      <Toolbar style={{ marginTop: '20px' }} />
      <ArticleTemplate article={article} locale={locale} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ query, locale, defaultLocale }) => {
  try {
    const article = await findOneDocuments(query.id as string, { isIncludeMedia: true });
    const articleIdByLanguage: ArticleIdByLanguage[] = await Promise.all(
      article.data.attributes.localizations.data.map(async (e) => {
        return {
          locale: locale || defaultLocale || 'en',
          lang: e.attributes.locale,
          id: e.id,
          i18n: langSelecter(locale).common,
        };
      })
    );
    return {
      props: {
        locale: locale || defaultLocale || 'en',
        article: article.data,
        articleIdByLanguage,
        i18n: langSelecter(locale).common,
      },
    };
  } catch (_) {
    return {
      props: {} as any,
      redirect: {
        destination: NAVIGATIONS.DOCS,
      },
    };
  }
};

export default DocumsntArticle;
