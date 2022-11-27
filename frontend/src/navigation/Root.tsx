import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { paths } from './paths';
const About = lazy(() => import('@/pages/About'));
const Community = lazy(() => import('@/pages/Community'));
const Documents = lazy(() => import('@/pages/Documents'));
const ErrorPage = lazy(() => import('@/pages/Error'));
const Index = lazy(() => import('@/pages/Index'));
const News = lazy(() => import('@/pages/News'));
const CommunityArticle = lazy(() => import('@/pages/slug/CommunityArticle'));
const DocumentsArticle = lazy(() => import('@/pages/slug/DocumentsArticle'));
const NewsArticle = lazy(() => import('@/pages/slug/NewsArticle'));

export const NAVIGATIONS = {
  root: {
    path: paths.root,
    elem: <Index />,
  },
  about: {
    path: paths.about,
    elem: <About />,
  },
  news: {
    path: paths.news,
    elem: <News />,
  },
  newsArticle: {
    path: `${paths.news}/:id`,
    elem: <NewsArticle />,
  },
  community: {
    path: paths.community,
    elem: <Community />,
  },
  communityArticle: {
    path: `${paths.community}/:id`,
    elem: <CommunityArticle />,
  },
  docs: {
    path: paths.docs,
    elem: <Documents />,
  },
  docsArticle: {
    path: `${paths.docs}/:id`,
    elem: <DocumentsArticle />,
  },
  error: {
    path: '*',
    elem: <ErrorPage />,
  },
};

export default function Root(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        {Object.keys(NAVIGATIONS).map((n, i) => {
          const item = NAVIGATIONS[n as keyof typeof NAVIGATIONS];
          return <Route key={i} path={item.path} element={item.elem} />;
        })}
      </Routes>
    </BrowserRouter>
  );
}
