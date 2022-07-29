interface BaseFindResponse {
  data: {
    id: number;
    attributes: {
      title: string;
      body: string;
      description: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface BaseFindOneResponse {
  data: {
    id: number;
    attributes: { title: string; body: string; createdAt: string; updatedAt: string; publishedAt: string };
  };
  meta: {};
}

export interface NewsReleaseFindResponse extends BaseFindResponse {}
export interface CommunityReleaseFindResponse extends BaseFindResponse {}
export interface DocumentFindResponse extends BaseFindResponse {}
export interface NewsReleaseFindOneResponse extends BaseFindOneResponse {}
export interface CommunityReleaseFindOneResponse extends BaseFindOneResponse {}
export interface DocumentFindOneResponse extends BaseFindOneResponse {}

export interface LocalesResponse {
  id: number;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  isDefault: boolean;
}
