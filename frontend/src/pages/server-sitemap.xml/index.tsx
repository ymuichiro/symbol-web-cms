import { languageSwitchToFrontend } from '@/languages';
import { findCommunityRelease, findDocuments, findNewsRelease } from '@/services/StrapiService';
import { NAVIGATIONS } from '@/types/navigations';
import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const store: ISitemapField[] = [];
  // news articles
  const newsRelease = await findNewsRelease('all');
  await Promise.all(
    newsRelease.data.map(({ id, attributes }) => {
      const locale = languageSwitchToFrontend(attributes.locale);
      const loc = `${process.env.NEXT_PUBLIC_HOSTING_URL}/${locale}${NAVIGATIONS.NEWS}/${id}`;
      store.push({ loc, lastmod: attributes.updatedAt });
    })
  );
  for (let i = 2; i <= newsRelease.meta.pagination.pageCount; i++) {
    const _newsRelease = await findNewsRelease('all', { isIncludeMedia: false, page: i });
    await Promise.all(
      _newsRelease.data.map(({ attributes, id }) => {
        const locale = languageSwitchToFrontend(attributes.locale);
        const loc = `${process.env.NEXT_PUBLIC_HOSTING_URL}/${locale}${NAVIGATIONS.NEWS}/${id}`;
        store.push({ loc, lastmod: attributes.updatedAt });
      })
    );
  }
  // community articles
  const communityRelease = await findCommunityRelease('all');
  await Promise.all(
    communityRelease.data.map(({ id, attributes }) => {
      const locale = languageSwitchToFrontend(attributes.locale);
      const loc = `${process.env.NEXT_PUBLIC_HOSTING_URL}/${locale}${NAVIGATIONS.COMMUNITY}/${id}`;
      store.push({ loc, lastmod: attributes.updatedAt });
    })
  );
  for (let i = 2; i <= communityRelease.meta.pagination.pageCount; i++) {
    const _communityRelease = await findCommunityRelease('all', { isIncludeMedia: false, page: i });
    await Promise.all(
      _communityRelease.data.map(({ attributes, id }) => {
        const locale = languageSwitchToFrontend(attributes.locale);
        const loc = `${process.env.NEXT_PUBLIC_HOSTING_URL}/${locale}${NAVIGATIONS.COMMUNITY}/${id}`;
        const lastmod = attributes.updatedAt;
        store.push({ loc, lastmod });
      })
    );
  }
  // document articles
  const documentRelease = await findDocuments('all');
  await Promise.all(
    documentRelease.data.map(({ id, attributes }) => {
      const locale = languageSwitchToFrontend(attributes.locale);
      const loc = `${process.env.NEXT_PUBLIC_HOSTING_URL}/${locale}${NAVIGATIONS.DOCS}/${id}`;
      store.push({ loc, lastmod: attributes.updatedAt });
    })
  );
  for (let i = 2; i <= documentRelease.meta.pagination.pageCount; i++) {
    const _documentRelease = await findDocuments('all', { isIncludeMedia: false, page: i });
    await Promise.all(
      _documentRelease.data.map(({ attributes, id }) => {
        const locale = languageSwitchToFrontend(attributes.locale);
        const loc = `${process.env.NEXT_PUBLIC_HOSTING_URL}/${locale}${NAVIGATIONS.DOCS}/${id}`;
        store.push({ loc, lastmod: attributes.updatedAt });
      })
    );
  }

  return getServerSideSitemap(ctx, store);
};

export default function SitemapIndex() {}
