import ArticleTemplate from '@/components/template/Article';
import { findOneNewsRelease, languageSwitchToFrontend, languageSwitchToStrapi } from '@/services/StrapiService';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { NewsReleaseFindOneResponse } from '@/types/StrapiModel';
import { NAVIGATIONS } from '@/navigation/Root';
import { Helmet } from 'react-helmet-async';

/** get news article */
function NewsArticle(): JSX.Element {
  const params = useParams<{ id: string }>();
  const [article, setArticle] = useState<NewsReleaseFindOneResponse['data'] | null>(null);
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  // 指定されたIDの記事を取得する
  useEffect(() => {
    if (params.id !== undefined) {
      findOneNewsRelease(params.id, { isIncludeMedia: true })
        .then((e) => {
          const { locale, localizations } = e.data.attributes;
          const lang: string = languageSwitchToFrontend(locale);
          // 取得した結果と現在の言語が異なる場合はリダイレクトする
          if (lang !== i18n.language) {
            const strapiLang = languageSwitchToStrapi(i18n.language);
            const redirectArticle = localizations.data.filter((e2) => e2.attributes.locale === strapiLang);
            if (redirectArticle.length !== 0) {
              return navigate(`${NAVIGATIONS.news.path}/${redirectArticle[0].id}`);
            }
          }
          setArticle({ ...e.data });
        })
        .catch(console.error);
    }
  }, [i18n.language, params.id]);

  return (
    <>
      <Helmet>
        <title>{`${import.meta.env.VITE_SITE_NAME}: ${article?.attributes.title ?? 'News'}`}</title>
        <meta name='description' content={article?.attributes.body.slice(0, 200)} />
      </Helmet>
      <ArticleTemplate article={article} />
    </>
  );
}

export default NewsArticle;
