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

function generateEndpoint(...path: string[]) {
  const u = new URL(location.origin);
  u.port = '1337';
  u.pathname = path.join('/');
  return u.href;
}

// TODO: フィルター処理の実装をそのうち

export default class StrapiService {
  static async getLocales(): Promise<LocalesResponse[]> {
    const ep = generateEndpoint('api', 'i18n', 'locales');
    const response = await fetch(ep, { method: 'GET' });
    const json = await response.json();
    return json;
  }

  static async findNewsRelease(): Promise<NewsReleaseFindResponse> {
    const ep = generateEndpoint('api', 'news-releases');
    const response = await fetch(ep, { method: 'GET' });
    const json = await response.json();
    return json;
  }

  static async findOneNewsRelease(id: string): Promise<NewsReleaseFindOneResponse> {
    const ep = generateEndpoint('api', 'news-releases', id);
    const response = await fetch(ep, { method: 'GET' });
    const json = await response.json();
    return json;
  }

  static async findCommunityRelease(): Promise<CommunityReleaseFindResponse> {
    const ep = generateEndpoint('api', 'community-releases');
    const response = await fetch(ep, { method: 'GET' });
    const json = await response.json();
    return json;
  }

  static async findOneCommunityRelease(id: string): Promise<CommunityReleaseFindOneResponse> {
    const ep = generateEndpoint('api', 'community-releases', id);
    const response = await fetch(ep, { method: 'GET' });
    const json = await response.json();
    return json;
  }

  static async findDocuments(): Promise<DocumentFindResponse> {
    const ep = generateEndpoint('api', 'documents');
    const response = await fetch(ep, { method: 'GET' });
    const json = await response.json();
    return json;
  }

  static async findOneDocuments(id: string): Promise<DocumentFindOneResponse> {
    const ep = generateEndpoint('api', 'documents', id);
    const response = await fetch(ep, { method: 'GET' });
    const json = await response.json();
    return json;
  }
}
