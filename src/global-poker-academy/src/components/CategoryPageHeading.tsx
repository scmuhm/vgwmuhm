import {
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

interface Fields {
  Title: TextField;
  Image: ImageField;
  Content: RichTextField;
  HeadingColor: {
    value: string;
  };
}

interface CategoryPageContentProps extends SitecoreContextValue {
  route: RouteData & {
    fields: Fields;
  };
  params: { [key: string]: string };
}

export const Default = (props: CategoryPageContentProps): JSX.Element => {
  const sitecoreContext = useSitecoreContext().sitecoreContext as CategoryPageContentProps;

  const titleField = sitecoreContext?.route?.fields?.Title;
  const imageField = sitecoreContext?.route?.fields?.Image?.value;
  const contentField = sitecoreContext?.route?.fields?.Content;
  const color = sitecoreContext?.route?.fields?.HeadingColor?.value;
  const styles = `${props.params.GridParameters ?? ''} ${props.params.Styles ?? ''}`.trimEnd();

  // TODO: Add color as background color. I've requested the full list of color
  //I created inverted-colors class for now according to Figma design we could include it to styles obj on sitecore side

  return (
    <div className={`component category-page-heading ${styles} ${color}`}>
      <div className="component-content">
        <div className="row">
          <div className="category-heading-container">
            <div className="category-image-container">
              <Image field={imageField} className="category-image" />
            </div>
            <div className="category-info">
              <h1 className="extra-large">
                <Text field={titleField} />
              </h1>
              <RichText field={contentField} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
