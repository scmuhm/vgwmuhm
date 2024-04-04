import {
  ComponentRendering,
  Image,
  ImageField,
  RichText,
  RichTextField,
  RouteData,
  SitecoreContextValue,
  Text,
  TextField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import { formatDate } from 'src/utils/date';
import { Thumbnail } from './Thumbnail';

import { Default as ArticlesSocialShare } from './ArticleSocialShare';

interface Fields {
  Title: TextField;
  Image: ImageField;
  Content: RichTextField;
  ArticleCategory: {
    fields: {
      Title: {
        value: string;
      };
      Color?: {
        value?: string;
      };
    };
  };
  Author: TextField;
  PublicationDate: {
    value: string;
  };
}

interface ArticlePageContentProps extends SitecoreContextValue {
  route: RouteData & {
    fields: Fields;
  };
  params: { [key: string]: string };
  rendering: ComponentRendering;
}

export const Default = (props: ArticlePageContentProps): JSX.Element => {
  const { t } = useI18n();
  const sitecoreContext = useSitecoreContext().sitecoreContext as ArticlePageContentProps;

  const titleField = sitecoreContext?.route?.fields?.Title;
  const imageField = sitecoreContext?.route?.fields?.Image?.value;
  const categoryField = sitecoreContext?.route?.fields?.ArticleCategory;
  const color = categoryField?.fields?.Color?.value || 'purpure';
  const publicationField = sitecoreContext?.route?.fields?.PublicationDate;
  const authorField = sitecoreContext?.route?.fields?.Author;
  const contentField = sitecoreContext?.route?.fields?.Content;
  const styles = `${props.params.GridParameters ?? ''} ${props.params.Styles ?? ''}`.trimEnd();
  return (
    <div className={`component article-page-heading ${styles}`}>
      <div className="component-content">
        <div className="row">
          <Thumbnail text={categoryField?.fields?.Title.value} color={color}>
            <h1>
              <Text field={titleField} />
            </h1>
          </Thumbnail>
          <br></br>
          <Image field={imageField} className="page-heading" />
          <br></br>
          <ArticlesSocialShare rendering={props.rendering} params={props.params} />
          <br></br>
          <div className="heading-publish-info">
            {t('published-date')} {formatDate(publicationField?.value)}
            <div className="author">
              {t('written-by')} <Text field={authorField} />
            </div>
          </div>
          <RichText field={contentField} className="page-heading-text" />
        </div>
      </div>
    </div>
  );
};
