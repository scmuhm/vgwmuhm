import {
  ComponentParams,
  ComponentRendering,
  ImageField,
  Image as JssImage,
  LinkField,
  RichText,
  RichTextField,
  Text,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';

// import { Default as ArticlesSocialShare } from './ArticleSocialShare';

interface SocialFields {
  Icon: ImageField;
  Title: TextField;
  Link: LinkField;
}

interface Fields {
  Social: TextField;
  SocialLinks: {
    id: string;
    fields: SocialFields;
  }[];
  Title: TextField;
  SubTitle: RichTextField;
  Text: TextField;
  Logo: ImageField;
}

export interface BrandBannerProps {
  fields?: Fields;
  params: ComponentParams;
  rendering: ComponentRendering;
}

export const Default = (props: BrandBannerProps): JSX.Element => {
  const styles = `${props.params?.GridParameters ?? ''} ${props.params?.Styles ?? ''}`.trimEnd();

  return (
    <div className={`component brand-banner ${styles}`}>
      <div className="component-content">
        <div className="row">
          <h1>
            <Text field={props.fields?.Title} />
          </h1>
          <h2>
            <RichText field={props.fields?.SubTitle} />
          </h2>
          <p>
            <Text field={props.fields?.Text} />
          </p>
          <div className="join-us-container">
            <JssImage field={props.fields?.Logo} />
            {/* <div className="social-media-container">
              <span>
                <Text field={props.fields?.Social} />
              </span>
              <ArticlesSocialShare
                rendering={props.rendering}
                params={props.params}
                isSocialMedia
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
