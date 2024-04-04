import {
  ComponentParams,
  GetStaticComponentProps,
  GraphQLRequestClient,
  Image,
  Text,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import ArticleListQueryResponse, { ArticleItem } from 'graphql/ArticleListResponse';
import { threeColumnArticlesQuery } from 'graphql/ThreeColumnArticlesGraphQL';
import { ComponentProps } from 'lib/component-props';
import { useI18n } from 'next-localization';
import Link from 'next/link';
import config from 'temp/config';
import { Thumbnail } from './Thumbnail';
import Button from './shared/Button';

export interface ThreeColumnArticlesProps extends Pick<ComponentProps, 'rendering'> {
  articles?: ArticleItem[];
  categoryTitle: string;
  categoryLink: string;
  categorySecondaryColor: string;

  params: ComponentParams;
}

export const getStaticProps: GetStaticComponentProps = async (_rendering) => {
  const articleCategoryId = _rendering?.params?.Category;

  if (articleCategoryId) {
    const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
      apiKey: config.sitecoreApiKey,
    });

    const pageSize = _rendering.params?.pageSize || 4;
    const result = await graphQLClient.request<ArticleListQueryResponse>(threeColumnArticlesQuery, {
      pageSize: pageSize,
      categoryId: articleCategoryId,
    });

    if (result?.item?.results) {
      return {
        categoryTitle:
          result.category?.categoryShortTitle?.value || result.category?.categoryTitle?.value,
        categoryLink: result.category?.url?.path,
        categorySecondaryColor: result.category?.secondaryColor?.value || '',
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

const renderArticleItem = (article: ArticleItem, useShortTitle: boolean) => (
  <div key={article.id} className="article-item">
    <Link href={article.url.path}>
      <Thumbnail
        text={
          useShortTitle
            ? article.category?.jsonValue.fields.ShortTitle
            : article.category?.jsonValue.fields.Title
        }
        color={article.category?.jsonValue.fields.Color.value}
      >
        <Image field={article.image.jsonValue} className="background-image" />
      </Thumbnail>
      <div className="info">
        <h4 className="title">
          <Text field={article?.title?.jsonValue} />
        </h4>
        <p className="description">
          <Text field={article?.summary?.jsonValue} />
        </p>
      </div>
    </Link>
  </div>
);

export const Default = ({
  articles = [],
  categoryTitle,
  categoryLink,
  params,
}: ThreeColumnArticlesProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const { t } = useI18n();

  const styles = `${params.GridParameters ?? ''} ${params.Styles ?? ''}`.trimEnd();
  const [topArticle, ...articlesList] = articles;
  const nextTop3Articles = articlesList.slice(0, 3);

  if (sitecoreContext.pageState === 'edit' && !topArticle) {
    return (
      <p style={{ color: 'red' }}>
        No Category/Articles selected for the component. Please select a category from it.
      </p>
    );
  }

  if (articles?.length === 0) {
    return <></>;
  }

  return (
    <div className={`component article-category ${styles}`}>
      <div className="component-content">
        <div className="row">
          {sitecoreContext.pageState === 'edit' && !params?.Category ? (
            <p style={{ color: 'red' }}>No category selected for the component</p>
          ) : null}
          <div className="two-column-articles two-column-grid equal-width margin-bottom-large margin-bottom-none-mobile">
            <div
              className={`two-column-article-card ${
                topArticle.category?.jsonValue.fields.Color.value ?? 'orange'
              }-light`}
              data-text={params.BackgroundText || categoryTitle?.split(' ')[0]}
            >
              {renderArticleItem(topArticle, false)}
            </div>
            <div
              className={`article-list-container ${
                topArticle.category?.jsonValue.fields.Color.value ?? 'orange'
              }-light`}
            >
              {nextTop3Articles?.map((article) => renderArticleItem(article, true))}
              <Button
                href={categoryLink}
                className="centered load-more-btn mobile-only"
                buttonType="link"
              >
                {t('read-more-articles')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
