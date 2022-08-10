/*

  Strapi との通信用

*/

import { Languages } from '../i18n/isLanguageByQuery';
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

// TODO: フィルター処理の実装をそのうち

export default class StrapiService {
  static async getLocales(): Promise<LocalesResponse[]> {
    const sp = new URLSearchParams();
    const ep = generateEndpoint(sp, 'api', 'i18n', 'locales');
    const response = await fetch(ep, { method: 'GET' });
    const json = await response.json();
    return json;
  }

  static async findNewsRelease(locale: Languages): Promise<NewsReleaseFindResponse> {
    const sp = new URLSearchParams();
    sp.append('locale', locale);
    const ep = generateEndpoint(sp, 'api', 'news-releases');
    const response = await fetch(ep, { method: 'GET' });
    const json = await response.json();
    return json;
  }

  static async findOneNewsRelease(id: string): Promise<NewsReleaseFindOneResponse> {
    const sp = new URLSearchParams();
    const ep = generateEndpoint(sp, 'api', 'news-releases', id);
    console.log(ep);
    const response = await fetch(ep, { method: 'GET' });
    const json = await response.json();
    return json;
  }

  static async findCommunityRelease(locale: Languages): Promise<CommunityReleaseFindResponse> {
    const sp = new URLSearchParams();
    sp.append('locale', locale);
    const ep = generateEndpoint(sp, 'api', 'community-releases');
    const response = await fetch(ep, { method: 'GET' });
    const json = await response.json();
    return json;
  }

  static async findOneCommunityRelease(id: string): Promise<CommunityReleaseFindOneResponse> {
    const sp = new URLSearchParams();
    const ep = generateEndpoint(sp, 'api', 'community-releases', id);
    const response = await fetch(ep, { method: 'GET' });
    const json = await response.json();
    return json;
  }

  static async findDocuments(locale: Languages): Promise<DocumentFindResponse> {
    const sp = new URLSearchParams();
    sp.append('locale', locale);
    const ep = generateEndpoint(sp, 'api', 'documents');
    const response = await fetch(ep, { method: 'GET' });
    const json = await response.json();
    return json;
  }

  static async findOneDocuments(id: string): Promise<DocumentFindOneResponse> {
    const sp = new URLSearchParams();
    const ep = generateEndpoint(sp, 'api', 'documents', id);
    const response = await fetch(ep, { method: 'GET' });
    const json = await response.json();
    return json;
  }
}
