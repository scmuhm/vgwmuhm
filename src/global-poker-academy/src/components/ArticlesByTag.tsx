import {
  ComponentParams,
  GetStaticComponentProps,
  GraphQLRequestClient,
  Image,
  Text,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import ArticleListQueryResponse, { ArticleItem } from 'graphql/ArticleListResponse';
import { articleByTagsQuery } from 'graphql/ArticlesByTagGraphQL';
import { ComponentProps } from 'lib/component-props';
import { useI18n } from 'next-localization';
import Link from 'next/link';
import config from 'temp/config';

interface Fields {
  ArticleTags: {
    id: string;
    fields: {
      Title: TextField;
    };
  }[];
}

export interface ArticleTagsListProps extends Pick<ComponentProps, 'rendering'> {
  articles?: ArticleItem[];
  params: ComponentParams;
}

const renderArticleItem = ({ id, url, title, image, summary, category }: ArticleItem) => {
  return (
    <div key={id} className="article-item">
      <Link href={url.path}>
        <div className="preview">
          <div className={`thumbnail ${category?.jsonValue.fields.Color.value}`}>
            <Text field={category?.jsonValue.fields.ShortTitle} />
          </div>
          <div className="background-image">
            <Image field={image.jsonValue} />
          </div>
        </div>
        <div className="info">
          <h4 className="title">
            <Text field={title.jsonValue} />
          </h4>
          <p className="description">
            <Text field={summary.jsonValue} />
          </p>
        </div>
      </Link>
    </div>
  );
};

export const getStaticProps: GetStaticComponentProps = async (_rendering, layoutData) => {
  const tags = layoutData.sitecore.route?.fields as Fields | undefined;

  if (tags && tags.ArticleTags) {
    const articleTags = tags.ArticleTags;

    const articleTagValues = articleTags.map((tag) => {
      return tag.id;
    });

    // Construct the OR block dynamically
    const orBlock = articleTagValues
      .map((value) => `{ name: "ArticleTags", value: "${value}", operator: CONTAINS }`)
      .join('\n');

    const completeQuery = articleByTagsQuery.replace('OR_BLOCK_PLACEHOLDER', orBlock);
    const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
      apiKey: config.sitecoreApiKey,
    });

    const pageSize = _rendering.params?.pageSize || 5;
    const result = await graphQLClient.request<ArticleListQueryResponse>(completeQuery, {
      pageSize: pageSize,
    });

    if (result?.item?.results) {
      return {
        articles: result.item.results.map(
          (article): ArticleItem => ({
            id: article.id,
            url: article.url,
            category: article.category || null,
            summary: article.summary,
            title: article.title,
            image: article.image,
          })
        ),
      };
    }
  }
  return [];
};

export const Default = (props: ArticleTagsListProps): JSX.Element => {
  const { t } = useI18n();
  const styles = `${props.params.GridParameters ?? ''} ${props.params.Styles ?? ''}`.trimEnd();
  return (
    <div className={`component article-taglist ${styles}`}>
      <div className="component-content">
        <div className="row">
          <h3>{t('articles-by-tag')}</h3>
          {props.articles?.map((article) => renderArticleItem(article))}
        </div>
      </div>
    </div>
  );
};
