import {
  ComponentParams,
  GetStaticComponentProps,
  GraphQLRequestClient,
  Image,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';
import ArticleListQueryResponse, { ArticleItem } from 'graphql/ArticleListResponse';
import { articlesByCategoryQuery } from 'graphql/ArticlesByCategoryGraphQL';
import { ComponentProps } from 'lib/component-props';
import { useI18n } from 'next-localization';
import Link from 'next/link';
import config from 'temp/config';
import Article from './ArticleItem';

interface Fields {
  ArticleCategory: {
    id: string;
  };
}

const renderArticleItem = ({ id, url, title, image, summary, category }: ArticleItem) => {
  return (
    <div key={id} className="article-item mobile-only">
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

export interface ArticleTagsListProps extends Pick<ComponentProps, 'rendering'> {
  articles?: ArticleItem[];
  params: ComponentParams;
}

export const getStaticProps: GetStaticComponentProps = async (_rendering, layoutData) => {
  const fields = layoutData.sitecore.route?.fields as Fields | undefined;

  if (fields && fields.ArticleCategory) {
    const articleCategoryId = fields.ArticleCategory.id;

    const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
      apiKey: config.sitecoreApiKey,
    });

    const pageSize = _rendering.params?.pageSize || 3;
    const result = await graphQLClient.request<ArticleListQueryResponse>(articlesByCategoryQuery, {
      pageSize: pageSize,
      itemId: layoutData.sitecore.route?.itemId,
      categoryId: articleCategoryId,
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

export const Default = ({ params, articles }: ArticleTagsListProps): JSX.Element => {
  const { t } = useI18n();
  const styles = `${params.GridParameters ?? ''} ${params.Styles ?? ''}`.trimEnd();

  return (
    <div className={`component article-category ${styles}`}>
      <div className="component-content">
        <div className="row">
          <h3>{t('articles-by-category')}</h3>
          <div className="articles-by-category-container">
            {articles &&
              articles?.map(({ id, url, title, image, summary, category }) => (
                <Article
                  key={id}
                  id={id}
                  url={url}
                  title={title}
                  image={image}
                  summary={summary}
                  category={category}
                  className="desktop-only cardItem"
                />
              ))}

            {articles?.map((article) => renderArticleItem(article))}
          </div>
        </div>
      </div>
    </div>
  );
};
