import {
  RouteData,
  SitecoreContextValue,
  Text,
  TextField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Divider } from './shared/Divider';

interface Fields {
  ArticleTags: {
    id: string;
    fields: {
      Title: TextField;
    };
  }[];
}

interface ArticleTagListProps extends SitecoreContextValue {
  route: RouteData & {
    fields: Fields;
  };
  params: { [key: string]: string };
}

const renderTagItem = (field: TextField, id: string) => (
  <li className="article-tag" key={id}>
    <Text field={field} />
  </li>
);

export const Default = (props: ArticleTagListProps): JSX.Element => {
  const sitecoreContext = useSitecoreContext().sitecoreContext as ArticleTagListProps;

  const tagList = sitecoreContext?.route?.fields?.ArticleTags ?? [];
  const styles = `${props.params.GridParameters ?? ''} ${props.params.Styles ?? ''}`.trimEnd();
  return (
    <div className={`component article-taglist ${styles}`}>
      <Divider />
      <div className="component-content">
        <div className="row">
          <ul className="article-tag-container">
            {tagList?.map((tag) => renderTagItem(tag.fields.Title, tag.id))}
          </ul>
        </div>
      </div>
    </div>
  );
};
