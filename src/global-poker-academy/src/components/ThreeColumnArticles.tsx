import {
  ComponentParams,
  GetStaticComponentProps,
  GraphQLRequestClient,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import ArticleListQueryResponse, { ArticleItem } from 'graphql/ArticleListResponse';
import { threeColumnArticlesQuery } from 'graphql/ThreeColumnArticlesGraphQL';
import { ComponentProps } from 'lib/component-props';
import { useI18n } from 'next-localization';
import config from 'temp/config';
import Article from './ArticleItem';
import Button from './shared/Button';

export interface ThreeColumnArticlesProps extends Pick<ComponentProps, 'rendering'> {
  articles?: ArticleItem[];
  categoryTitle: string;
  categoryLink: string;

  params: ComponentParams;
}

const SITE_ROOT = '504D55F18A104D39A42120542826F1FF';
export const getStaticProps: GetStaticComponentProps = async (_rendering) => {
  const articleCategoryId = _rendering?.params?.Category || SITE_ROOT;

  if (articleCategoryId) {
    const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
      apiKey: config.sitecoreApiKey,
    });

    const pageSize = _rendering.params?.pageSize || 6;
    const result = await graphQLClient.request<ArticleListQueryResponse>(threeColumnArticlesQuery, {
      pageSize: pageSize,
      categoryId: articleCategoryId,
    });

    if (result?.item?.results) {
      return {
        categoryTitle:
          result.category?.categoryShortTitle?.value || result.category?.categoryTitle?.value,
        categoryLink: result.category?.url?.path,
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

export const Default = ({
  articles,
  params,
  categoryLink,
  categoryTitle,
}: ThreeColumnArticlesProps): JSX.Element => {
  const { t } = useI18n();
  const styles = `${params.GridParameters ?? ''} ${params.Styles ?? ''}`.trimEnd();

  const categoryTitleValue = categoryLink === '/' ? t('all-in') : categoryTitle;
  const { sitecoreContext } = useSitecoreContext();

  return (
    <div className={`component article-category ${styles}`}>
      <div className="component-content">
        <div className="row">
          <div className="heading-container">
            <h3>{categoryTitleValue}</h3>
            {sitecoreContext.pageState === 'edit' && !params?.Category ? (
              <p style={{ color: 'red' }}>
                No category selected for the component, listing articles from all categories
              </p>
            ) : null}
            <Button href={categoryLink} className="view-all" buttonType="link">
              {t('view-all')}
            </Button>
          </div>
          <div className="articles-by-category-container margin-bottom-large">
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
                  className="cardItem"
                />
              ))}
            <Button href={categoryLink} className="centered load-more-btn mobile-only">
              {t('read-more-articles')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
