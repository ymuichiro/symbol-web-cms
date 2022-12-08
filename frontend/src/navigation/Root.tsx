import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const About = lazy(() => import('@/pages/About'));
const Community = lazy(() => import('@/pages/Community'));
const Documents = lazy(() => import('@/pages/Documents'));
const Index = lazy(() => import('@/pages/Index'));
const News = lazy(() => import('@/pages/News'));
const CommunityArticle = lazy(() => import('@/pages/slug/CommunityArticle'));
const DocumentsArticle = lazy(() => import('@/pages/slug/DocumentsArticle'));
const NewsArticle = lazy(() => import('@/pages/slug/NewsArticle'));

/**
 * Defines routing information.
 * When adding a route path, also add `vite.config.ts` to reflect it in sitemap.
 */
export const NAVIGATIONS = {
  root: {
    path: '*',
    elem: <Index />,
  },
  about: {
    path: '/about',
    elem: <About />,
  },
  news: {
    path: '/news',
    elem: <News />,
  },
  newsArticle: {
    path: `/news/:id`,
    elem: <NewsArticle />,
  },
  community: {
    path: '/community',
    elem: <Community />,
  },
  communityArticle: {
    path: `/community/:id`,
    elem: <CommunityArticle />,
  },
  docs: {
    path: '/docs',
    elem: <Documents />,
  },
  docsArticle: {
    path: `/docs/:id`,
    elem: <DocumentsArticle />,
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
