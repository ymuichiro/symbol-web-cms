/*

  Strapi との通信用

*/

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

/** Generate Hosting Server URL（for shared ext:twitter） */
export function getHostingServerUrl(search?: URLSearchParams, ...path: string[]): string {
  const { VITE_HOSTING_URL } = import.meta.env;
  if (VITE_HOSTING_URL === undefined) {
    throw new Error('The URL of the Hosting URL is not specified');
  }
  const hostingUrl = new URL(VITE_HOSTING_URL);
  hostingUrl.pathname = path.join('/');
  if (search !== undefined) {
    hostingUrl.search = search.toString();
  }
  return hostingUrl.href;
}

/** Generate Backend API（ CMS Strapi ） */
export function getBackendApiUrl(search?: URLSearchParams, ...path: string[]): string {
  if (import.meta.env.VITE_API_URL === undefined) {
    throw new Error('The URL of the backend API is not specified');
  }
  const backendUrl = new URL(import.meta.env.VITE_API_URL);
  backendUrl.pathname = path.join('/');
  if (search !== undefined) {
    backendUrl.search = search.toString();
  }
  return backendUrl.href;
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

function generateSortQuery(searchParams: URLSearchParams): URLSearchParams {
  searchParams.append(`sort[0]`, 'id:desc');
  return searchParams;
}

/**
 * Convert the i18n language key on the front end side and the language key on the Strapi side
 */
export function languageSwitchToStrapi(locale: string): string {
  switch (locale) {
    case 'en':
      return 'en';
    case 'ja':
      return 'ja-JP';
    case 'ko':
      return 'ko';
    case 'zh':
      return 'zh';
    default:
      return 'ja-JP';
  }
}

/**
 * Convert the i18n language key on the front end side and the language key on the Strapi side
 */
export function languageSwitchToFrontend(locale: string): string {
  switch (locale) {
    case 'en':
      return 'en';
    case 'ja-JP':
      return 'ja';
    case 'ko':
      return 'ko';
    default:
      return 'ja';
  }
}

export async function getLocales(): Promise<LocalesResponse[]> {
  const sp = new URLSearchParams();
  const ep = getBackendApiUrl(sp, 'api', 'i18n', 'locales');
  const response = await fetch(ep, { method: 'GET' });
  const json = await response.json();
  return json;
}

/** http:// の有無で strapi の uri を追加 */
export function getImageUri(path?: string): string | undefined {
  if (path === undefined) return undefined;
  if (path.match(/^http.*/) === null) {
    return getBackendApiUrl(new URLSearchParams(), path);
  } else {
    return path;
  }
}

interface StrapiFindOptions {
  isIncludeMedia: boolean;
}

interface StrapiFindOptionsWithKey {
  isIncludeMedia: boolean;
  keywords?: string[];
}

export async function findNewsRelease(locale?: string, options?: StrapiFindOptions): Promise<NewsReleaseFindResponse> {
  try {
    const sp = new URLSearchParams();
    if (typeof locale === 'string') {
      sp.append('locale', languageSwitchToStrapi(locale));
    }
    if (options?.isIncludeMedia ?? false) {
      sp.append('populate', '*');
    }
    generateSortQuery(sp);
    const ep = getBackendApiUrl(sp, 'api', 'news-releases');
    const response = await fetch(ep, { method: 'GET' });
    if (response.status >= 400) throw new Error(`${findNewsRelease.name}: An error has occurred on the server.`);
    return await response.json();
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error();
    }
  }
}

export async function findOneNewsRelease(id: string, options?: StrapiFindOptions): Promise<NewsReleaseFindOneResponse> {
  try {
    const sp = new URLSearchParams();
    if (options?.isIncludeMedia ?? false) {
      sp.append('populate', '*');
    }
    const ep = getBackendApiUrl(sp, 'api', 'news-releases', id);
    const response = await fetch(ep, { method: 'GET' });
    if (response.status >= 400) throw new Error(`${findOneNewsRelease.name}: An error has occurred on the server.`);
    return await response.json();
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error();
    }
  }
}

// prettier-ignore
export async function findCommunityRelease(locale?: string, options?: StrapiFindOptions): Promise<CommunityReleaseFindResponse> {
  try {
    const sp = new URLSearchParams();
    if (typeof locale === 'string') {
      sp.append('locale', languageSwitchToStrapi(locale));
    }
    if (options?.isIncludeMedia ?? false) {
      sp.append('populate', '*');
    }
    generateSortQuery(sp);
    const ep = getBackendApiUrl(sp, 'api', 'community-releases');
    const response = await fetch(ep, { method: 'GET' });
    if (response.status >= 400) throw new Error(`${findCommunityRelease.name}: An error has occurred on the server.`);
    return await response.json();
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error();
    }
  }
}

// prettier-ignore
export async function findOneCommunityRelease(id: string, options?: StrapiFindOptions): Promise<CommunityReleaseFindOneResponse> {
  try {
    const sp = new URLSearchParams();
    if (options?.isIncludeMedia ?? false) {
      sp.append('populate', '*');
    }
    const ep = getBackendApiUrl(sp, 'api', 'community-releases', id);
    const response = await fetch(ep, { method: 'GET' });
    if (response.status >= 400) throw new Error(`${findOneCommunityRelease.name}: An error has occurred on the server.`);
    return await response.json();
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error();
    }
  }
}

// prettier-ignore
export async function findDocuments(locale?: string, options?: StrapiFindOptionsWithKey): Promise<DocumentFindResponse> {
  try {
    const sp = new URLSearchParams();
    if (typeof locale === 'string') {
      sp.append('locale', languageSwitchToStrapi(locale));
    }
    if (options !== undefined) {
      if (options.isIncludeMedia) {
        sp.append('populate', '*');
      }
      if (options.keywords !== undefined && options.keywords.length !== 0) {
        generateFilterKeywordQuery(sp, options.keywords);
      }
    }
    generateSortQuery(sp);
    const ep = getBackendApiUrl(sp, 'api', 'documents');
    const response = await fetch(ep, { method: 'GET' });
    if (response.status >= 400) throw new Error(`${findDocuments.name}: An error has occurred on the server.`);
    return await response.json();
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error();
    }
  }
}

export async function findOneDocuments(id: string, options?: StrapiFindOptions): Promise<DocumentFindOneResponse> {
  try {
    const sp = new URLSearchParams();
    if (options?.isIncludeMedia ?? false) {
      sp.append('populate', '*');
    }
    const ep = getBackendApiUrl(sp, 'api', 'documents', id);
    const response = await fetch(ep, { method: 'GET' });
    if (response.status >= 400) throw new Error(`${findOneDocuments.name}: An error has occurred on the server.`);
    return await response.json();
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error();
    }
  }
}

/** コミュニティ一覧へ表示するコミュニティ情報の一覧 */
export async function findSpaceRelease(locale?: string, options?: StrapiFindOptions): Promise<SpaceFindResponse> {
  try {
    const sp = new URLSearchParams();
    if (typeof locale === 'string') {
      sp.append('locale', languageSwitchToStrapi(locale));
    }
    if (options?.isIncludeMedia ?? false) {
      sp.append('populate', '*');
    }
    const ep = getBackendApiUrl(sp, 'api', 'spaces');
    const response = await fetch(ep, { method: 'GET' });
    if (response.status >= 400) throw new Error(`${findSpaceRelease.name}: An error has occurred on the server.`);
    return await response.json();
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error();
    }
  }
}
