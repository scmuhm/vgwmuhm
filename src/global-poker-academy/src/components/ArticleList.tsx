import {
  ComponentParams,
  GetStaticComponentProps,
  GraphQLRequestClient,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import ArticleListQueryResponse, { ArticleItem } from 'graphql/ArticleListResponse';
import { articleListingQuery } from 'graphql/ArticleListingGraphQL';
import { ComponentProps } from 'lib/component-props';
import { useI18n } from 'next-localization';
import { useState } from 'react';
import config from 'temp/config';
import Article from './ArticleItem';
import Button from './shared/Button';

export interface ArticleTagsListProps extends Pick<ComponentProps, 'rendering'> {
  articles?: ArticleItem[];
  params: ComponentParams;
}

export const getStaticProps: GetStaticComponentProps = async (_rendering, layoutData) => {
  const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
    apiKey: config.sitecoreApiKey,
  });

  const pageSize = 200; //_rendering.params?.pageSize || 25;
  const result = await graphQLClient.request<ArticleListQueryResponse>(articleListingQuery, {
    pageSize: pageSize,
    categoryId: layoutData.sitecore.route?.itemId,
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

  return [];
};
const ArticlesPerPage = 12;
export const Default = (props: ArticleTagsListProps): JSX.Element => {
  const { t } = useI18n();
  const styles = `${props.params.GridParameters ?? ''} ${props.params.Styles ?? ''}`.trimEnd();
  const [currentPage, setCurrentPage] = useState(1);
  const articles = props?.articles || [];
  const startIndex = 0;
  const endIndex = currentPage * ArticlesPerPage;
  const displayedArticles = articles?.slice(startIndex, endIndex);
  const { sitecoreContext } = useSitecoreContext();

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };
  return (
    <div className={`component article-category ${styles}`}>
      <div className="component-content">
        <div className="row">
          <div className="articles-by-category-container">
            {sitecoreContext.pageState === 'edit' &&
            (!displayedArticles || displayedArticles.length === 0) ? (
              <p style={{ color: 'red' }}>
                No Articles added under this category page or internal search indexes are being
                built. Please add an Article below this category or check back later.
              </p>
            ) : null}

            {displayedArticles.map(({ id, url, title, image, summary, category }) => (
              <Article
                key={id}
                id={id}
                url={url}
                title={title}
                image={image}
                summary={summary}
                category={category}
                className="cardItem"
              />
            ))}
          </div>
        </div>
        <div className="row">
          <div className="article-pagination">
            {articles.length > ArticlesPerPage ? (
              <p>
                {displayedArticles.length} of {articles.length}
              </p>
            ) : null}
            {endIndex < articles.length && (
              <Button className="centered load-more-btn" onClick={handleLoadMore}>
                {t('load-more')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
