/*

  Strapi との通信用

*/

import { languageSwitchToStrapi } from '@/languages';
import {
  CommunityReleaseFindOneResponse,
  CommunityReleaseFindResponse,
  DocumentFindOneResponse,
  DocumentFindResponse,
  LocalesResponse,
  NewsReleaseFindOneResponse,
  NewsReleaseFindResponse,
  SpaceFindResponse,
} from '@/types/StrapiModel';

interface StrapiFindOptions {
  isIncludeMedia: boolean;
  keywords?: string[];
  page?: number;
}

function generateFilterKeywordQuery(searchParams: URLSearchParams, keywords: string[]): URLSearchParams {
  if (keywords.length === 0) {
    return searchParams;
  } else {
    let counter = 0;
    keywords.forEach((keyword) => {
      counter++;
      searchParams.append(`filters[$or][${counter}][title][$contains]`, keyword);
    });
    keywords.forEach((keyword) => {
      counter++;
      searchParams.append(`filters[$or][${counter}][body][$contains]`, keyword);
    });
    return searchParams;
  }
}

const initFindRequest = (baseUrl: string, locale?: string, options?: StrapiFindOptions): string => {
  const ep = new URL(baseUrl);
  const sp = new URLSearchParams();
  typeof locale === 'string' && sp.append('locale', languageSwitchToStrapi(locale));
  options?.isIncludeMedia && sp.append('populate', '*');
  options?.page && sp.append('pagination[page]', options.page.toString());
  options?.keywords && generateFilterKeywordQuery(sp, options.keywords);
  sp.append(`sort[0]`, 'id:desc');
  ep.search = sp.toString();
  return ep.href;
};

const initFindOneRequest = (baseUrl: string, options?: StrapiFindOptions): string => {
  const ep = new URL(baseUrl);
  const sp = new URLSearchParams();
  options?.isIncludeMedia && sp.append('populate', '*');
  options?.page && sp.append('pagination[page]', options.page.toString());
  ep.search = sp.toString();
  return ep.href;
};

export async function findNewsRelease(locale?: string, options?: StrapiFindOptions): Promise<NewsReleaseFindResponse> {
  const ep = initFindRequest([process.env.NEXT_PUBLIC_API_URL, 'api', 'news-releases'].join('/'), locale, options);
  const response = await fetch(ep, { method: 'GET' });
  if (response.status >= 400) throw new Error(`${findNewsRelease.name}: An error has occurred on the server.`);
  return await response.json();
}

export async function findOneNewsRelease(id: string, options?: StrapiFindOptions): Promise<NewsReleaseFindOneResponse> {
  const ep = initFindOneRequest([process.env.NEXT_PUBLIC_API_URL, 'api', 'news-releases', id].join('/'), options);
  const response = await fetch(ep, { method: 'GET' });
  if (response.status >= 400) throw new Error(`${findOneNewsRelease.name}: An error has occurred on the server.`);
  return await response.json();
}

// prettier-ignore
export async function findCommunityRelease(locale?: string, options?: StrapiFindOptions): Promise<CommunityReleaseFindResponse> {
    const ep = initFindRequest([process.env.NEXT_PUBLIC_API_URL, 'api', 'community-releases'].join('/'), locale, options);    
    const response = await fetch(ep, { method: 'GET' });
    if (response.status >= 400) throw new Error(`${findCommunityRelease.name}: An error has occurred on the server.`);
    return await response.json();
}

// prettier-ignore
export async function findOneCommunityRelease(id: string, options?: StrapiFindOptions): Promise<CommunityReleaseFindOneResponse> {
    const ep = initFindOneRequest([process.env.NEXT_PUBLIC_API_URL, 'api', 'community-releases',id].join('/'), options);
    const response = await fetch(ep, { method: 'GET' });
    if (response.status >= 400) throw new Error(`${findOneCommunityRelease.name}: An error has occurred on the server.`);
    return await response.json();
}

// prettier-ignore
export async function findDocuments(locale?: string, options?: StrapiFindOptions): Promise<DocumentFindResponse> {
    const ep = initFindRequest([process.env.NEXT_PUBLIC_API_URL, 'api', 'documents'].join('/'), locale, options);
    const response = await fetch(ep, { method: 'GET' });
    if (response.status >= 400) throw new Error(`${findDocuments.name}: An error has occurred on the server.`);
    return await response.json();
}

export async function findOneDocuments(id: string, options?: StrapiFindOptions): Promise<DocumentFindOneResponse> {
  const ep = initFindOneRequest([process.env.NEXT_PUBLIC_API_URL, 'api', 'documents', id].join('/'), options);
  const response = await fetch(ep, { method: 'GET' });
  if (response.status >= 400) throw new Error(`${findOneDocuments.name}: An error has occurred on the server.`);
  return await response.json();
}

export async function findSpaceRelease(locale?: string, options?: StrapiFindOptions): Promise<SpaceFindResponse> {
  const ep = initFindRequest([process.env.NEXT_PUBLIC_API_URL, 'api', 'spaces'].join('/'), locale, options);
  const response = await fetch(ep, { method: 'GET' });
  if (response.status >= 400) throw new Error(`${findSpaceRelease.name}: An error has occurred on the server.`);
  return await response.json();
}

export async function findLocales(): Promise<LocalesResponse[]> {
  const ep = [process.env.NEXT_PUBLIC_API_URL, 'api', 'i18n', 'locales'].join('/');
  const response = await fetch(ep, { method: 'GET' });
  return await response.json();
}
