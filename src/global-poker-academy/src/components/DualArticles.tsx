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

export interface DualArticleProps {
  fields?: Fields;
  params: ComponentParams;
}

const renderArticleItem = (
  { Title, Image, Summary, ArticleCategory }: ArticleFields,
  url: string,
  id: string
) => {
  return (
    <div key={id} className="article-item">
      {/* TODO: Do not render URL in Editing Mode, it redirects Pages to the URL */}
      <Link href={url}>
        <div className={`thumbnail ${ArticleCategory?.fields.Color.value}`}>
          <Text field={ArticleCategory?.fields.Title} />
        </div>
        <JssImage field={Image} />
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

export const Default = (props: DualArticleProps): JSX.Element => {
  const styles = `${props.params.GridParameters ?? ''} ${props.params.Styles ?? ''}`.trimEnd();
  const [topArticle, sideArticle] = props.fields?.Articles ? props.fields?.Articles : [];
  const topArticleColor = topArticle?.fields?.ArticleCategory?.fields.Color.value ?? 'orange';
  const sideArticleColor = sideArticle?.fields?.ArticleCategory?.fields.Color.value ?? 'purpure';
  const { sitecoreContext } = useSitecoreContext();

  if (sitecoreContext.pageState === 'edit' && !topArticle) {
    return (
      <p style={{ color: 'red' }}>
        No Articles selected for the component. Please select an Article in the data source item.
      </p>
    );
  }

  return (
    <div className={`component article-taglist ${styles}`}>
      <div className="component-content">
        <div className="row">
          <div className="dual-articles two-column-grid">
            {topArticle && (
              <div
                className={`dual-articles-card ${topArticleColor}-light margin-bottom-before-desktop top-article`}
              >
                {renderArticleItem(topArticle.fields, topArticle.url, topArticle.id)}
              </div>
            )}

            {sideArticle && (
              <div
                className={`dual-articles-card ${sideArticleColor}-light margin-bottom-before-desktop side-article`}
              >
                {renderArticleItem(sideArticle.fields, sideArticle.url, sideArticle.id)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
