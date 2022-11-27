interface BaseFindResponse<T> {
  data: Array<{
    id: number;
    attributes: T;
  }>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface BaseFindOneResponse<T> {
  data: {
    id: number;
    attributes: T;
  };
  meta: {};
}

interface BaseImageResponse {
  data: {
    attributes: {
      alternativeText: string;
      caption: string;
      createdAt: string;
      ext: string;
      hash: string;
      height: number;
      mime: string;
      name: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: null;
      size: number;
      updatedAt: string;
      url: string;
      width: number;
    };
  };
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface NewsReleaseField {
  title: string;
  body: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  headerImage?: BaseImageResponse;
  locale: string;
  localizations: {
    data: Array<{
      id: number;
      attributes: {
        title: string;
        body: string;
        description: string;
        createdAt: string; // format:'2022-11-21T01:32:13.162Z'
        updatedAt: string;
        publishedAt: string;
        locale: string;
      };
    }>;
  };
}

interface CommunityReleaseField {
  title: string;
  body: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  headerImage?: BaseImageResponse;
  locale: string;
  localizations: {
    data: Array<{
      id: number;
      attributes: {
        title: string;
        body: string;
        description: string;
        createdAt: string; // format:'2022-11-21T01:32:13.162Z'
        updatedAt: string;
        publishedAt: string;
        locale: string;
      };
    }>;
  };
}

interface DocumentField {
  title: string;
  body: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  localizations: {
    data: Array<{
      id: number;
      attributes: {
        title: string;
        body: string;
        description: string;
        createdAt: string; // format:'2022-11-21T01:32:13.162Z'
        updatedAt: string;
        publishedAt: string;
        locale: string;
      };
    }>;
  };
}

export interface SpaceField {
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  url: string;
  category: 'sns' | 'chat' | 'blog';
  platform: 'discord' | 'twitter' | 'slack' | 'web' | 'github';
  locale: string;
  localizations: {
    data: Array<{
      id: number;
      attributes: {
        title: string;
        body: string;
        description: string;
        createdAt: string; // format:'2022-11-21T01:32:13.162Z'
        updatedAt: string;
        publishedAt: string;
        locale: string;
      };
    }>;
  };
}

export interface NewsReleaseFindResponse extends BaseFindResponse<NewsReleaseField> {}
export interface CommunityReleaseFindResponse extends BaseFindResponse<CommunityReleaseField> {}
export interface DocumentFindResponse extends BaseFindResponse<DocumentField> {}
export interface NewsReleaseFindOneResponse extends BaseFindOneResponse<NewsReleaseField> {}
export interface CommunityReleaseFindOneResponse extends BaseFindOneResponse<CommunityReleaseField> {}
export interface DocumentFindOneResponse extends BaseFindOneResponse<DocumentField> {}
export interface SpaceFindResponse extends BaseFindResponse<SpaceField> {}

export interface LocalesResponse {
  id: number;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  isDefault: boolean;
}
