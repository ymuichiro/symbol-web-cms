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
} from '../model/StrapiModel';

function generateEndpoint(search: URLSearchParams, ...path: string[]) {
  if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
    const u = new URL(process.env.NEXT_API_SERVER_URL || 'http://localhost');
    u.port = '1337';
    u.pathname = path.join('/');
    u.search = search.toString();
    return u.href;
  } else {
    if (process.env.NEXT_PUBLIC_NEXT_API_SERVER_URL === undefined) {
      throw new Error('api server uri is not defined');
    }
    const u = new URL(process.env.NEXT_PUBLIC_NEXT_API_SERVER_URL);
    u.pathname = path.join('/');
    u.search = search.toString();
    return u.href;
  }
}

function generateFilterKeywordQuery(searchParams:URLSearchParams,keywords:string[]):URLSearchParams {
  if(keywords.length === 0){
    return searchParams;
  } else {
    let counter = 0;
    keywords.forEach((keyword)=> {
      counter++;
      searchParams.append(`filters[$or][${counter}][title][$contains]`,keyword);
    })
    keywords.forEach((keyword)=> {
      counter++;
      searchParams.append(`filters[$or][${counter}][body][$contains]`,keyword);
    })
    return searchParams;
  }
}

function languageSwitchToStrapi(locale: string) {
  switch (locale) {
    case 'en-US':
      return 'en';
    case 'ja-JP':
      return 'ja-JP';
    case "ko-KR":
      return "ko";
    default:
      return 'ja-JP';
  }
}

export default class StrapiService {
  static async getLocales(): Promise<LocalesResponse[]> {
    const sp = new URLSearchParams();
    const ep = generateEndpoint(sp, 'api', 'i18n', 'locales');
    const response = await fetch(ep, { method: 'GET' });
    const json = await response.json();
    return json;
  }

  /** http:// の有無で strapi の uri を追加 */
  static getImageUri(path?: string): string | undefined {
    if (path === undefined) return undefined;
    if (path.match(/^http.*/) === null) {
      return generateEndpoint(new URLSearchParams(), path);
    } else {
      return path;
    }
  }

  static async findNewsRelease(
    locale?: string,
    options?: { isIncludeMedia: boolean }
  ): Promise<NewsReleaseFindResponse> {
    const sp = new URLSearchParams();
    if (locale) sp.append('locale', languageSwitchToStrapi(locale));
    if (options && options.isIncludeMedia) sp.append('populate', '*');
    const ep = generateEndpoint(sp, 'api', 'news-releases');
    const response = await fetch(ep, { method: 'GET' });
    const json = await response.json();
    return json;
  }

  static async findOneNewsRelease(
    id: string,
    options?: { isIncludeMedia: boolean }
  ): Promise<NewsReleaseFindOneResponse> {
    const sp = new URLSearchParams();
    if (options && options.isIncludeMedia) sp.append('populate', '*');
    const ep = generateEndpoint(sp, 'api', 'news-releases', id);
    const response = await fetch(ep, { method: 'GET' });
    const json = await response.json();
    return json;
  }

  static async findCommunityRelease(
    locale?: string,
    options?: { isIncludeMedia: boolean }
  ): Promise<CommunityReleaseFindResponse> {
    const sp = new URLSearchParams();
    if (locale) sp.append('locale', languageSwitchToStrapi(locale));
    if (options && options.isIncludeMedia) sp.append('populate', '*');
    const ep = generateEndpoint(sp, 'api', 'community-releases');
    const response = await fetch(ep, { method: 'GET' });
    const json = await response.json();
    return json;
  }

  static async findOneCommunityRelease(
    id: string,
    options?: { isIncludeMedia: boolean }
  ): Promise<CommunityReleaseFindOneResponse> {
    const sp = new URLSearchParams();
    if (options && options.isIncludeMedia) sp.append('populate', '*');
    const ep = generateEndpoint(sp, 'api', 'community-releases', id);
    const response = await fetch(ep, { method: 'GET' });
    const json = await response.json();
    return json;
  }

  static async findDocuments(locale?: string, options?: { isIncludeMedia: boolean,keywords?:string[] }): Promise<DocumentFindResponse> {
    let sp = new URLSearchParams();
    if (locale) sp.append('locale', languageSwitchToStrapi(locale));
    if (options && options.isIncludeMedia) sp.append('populate', '*');
    if(options && options.keywords && options.keywords?.length !== 0) generateFilterKeywordQuery(sp,options.keywords);
    const ep = generateEndpoint(sp, 'api', 'documents');
    const response = await fetch(ep, { method: 'GET' });
    const json = await response.json();
    return json;
  }

  static async findOneDocuments(id: string, options?: { isIncludeMedia: boolean }): Promise<DocumentFindOneResponse> {
    const sp = new URLSearchParams();
    if (options && options.isIncludeMedia) sp.append('populate', '*');
    const ep = generateEndpoint(sp, 'api', 'documents', id);
    const response = await fetch(ep, { method: 'GET' });
    const json = await response.json();
    return json;
  }
}
