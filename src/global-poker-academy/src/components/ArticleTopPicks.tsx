import {
  ComponentParams,
  ImageField,
  Image as JssImage,
  Text,
  TextField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

import Link from 'next/link';

interface ArticleFields {
  ArticleCategory: {
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
  Summary: TextField;
  Title: TextField;
  Image: ImageField;
}

interface Fields {
  Articles: {
    id: string;
    fields: ArticleFields;
    url: string;
  }[];
}

export interface ArticleTopPicksProps {
  fields?: Fields;
  params: ComponentParams;
}

const renderArticleItem = (
  { Title, Image, Summary, ArticleCategory }: ArticleFields,
  url: string,
  id: string,
  useShortTitle: boolean
) => {
  return (
    <div key={id} className="article-item">
      {/* TODO: Do not render URL in Editing Mode, it redirects Pages to the URL */}
      <Link href={url}>
        <div className="preview">
          <div className={`thumbnail ${ArticleCategory?.fields.Color.value}`}>
            <Text
              field={
                useShortTitle ? ArticleCategory?.fields.ShortTitle : ArticleCategory?.fields.Title
              }
            />
          </div>
          <div className="background-image">
            <JssImage field={Image} />
          </div>
        </div>
        <div className="info">
          <h4 className="title">
            <Text field={Title} />
          </h4>
          <p className="description">
            <Text field={Summary} />
          </p>
        </div>
      </Link>
    </div>
  );
};

export const Default = (props: ArticleTopPicksProps): JSX.Element => {
  const styles = `${props.params.GridParameters ?? ''} ${props.params.Styles ?? ''}`.trimEnd();
  const { sitecoreContext } = useSitecoreContext();
  const [topArticle, ...articles] = props.fields?.Articles ?? [];
  const nextTop4Articles = articles.slice(0, 4);

  if (sitecoreContext.pageState === 'edit' && !topArticle) {
    return (
      <p style={{ color: 'red' }}>
        No articles selected for the component, find the datasource item Content Editor and select
        articles
      </p>
    );
  }

  if (articles?.length === 0) {
    return <></>;
  }

  return (
    <div className={`component article-taglist ${styles}`}>
      <div className="component-content">
        <div className="row">
          <div className="article-top-picks two-column-grid">
            <div className="top-article-card">
              {renderArticleItem(topArticle.fields, topArticle.url, topArticle.id, false)}
            </div>
            <div className="article-list-container">
              {nextTop4Articles.map((article) =>
                renderArticleItem(article.fields, article.url, article.id, true)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
