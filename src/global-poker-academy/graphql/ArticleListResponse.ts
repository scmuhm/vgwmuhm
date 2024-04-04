import { ImageField, TextField } from '@sitecore-jss/sitecore-jss-nextjs';

export interface ArticleItem {
  id: string;
  url: {
    path: string;
  };
  title: {
    jsonValue: TextField;
  };
  category: {
    jsonValue: {
      fields: {
        Title: {
          value: string;
        };
        ShortTitle: {
          value: string;
        };
        Color: {
          value: string;
        };
      };
    };
  } | null;
  summary: {
    jsonValue: TextField;
  };
  image: {
    jsonValue: ImageField;
  };
}

interface ArticleResult {
  results: ArticleItem[];
}

export default interface ArticleListQueryResponse {
  item: ArticleResult;
  category?: {
    id?: string;
    url?: {
      path?: string;
    };
    categoryTitle?: {
      value?: string;
    };
    categoryShortTitle?: {
      value?: string;
    };
    secondaryColor?: {
      value?: string;
    };
  };
}
