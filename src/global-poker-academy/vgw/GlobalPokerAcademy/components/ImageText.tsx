import {
  ImageField,
  Image as JssImage,
  RichText as JssRichText,
  RichTextField,
  Text,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Image: ImageField;
  Text: RichTextField;
  Title: TextField;
}

type ImageTextProps = {
  params: { [key: string]: string };
  fields: Fields;
  className?: string;
  imageClassName?: string;
};

const ImageTextDefault = (props: ImageTextProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">ImageText</span>
    </div>
  </div>
);

// The default variant is the ImageLeft-TextRight component
export const Default = (props: ImageTextProps): JSX.Element => {
  const { params, fields, imageClassName, className } = props;
  const id = params.RenderingIdentifier;
  if (fields) {
    return (
      <div
        className={`component image-text ${className} ${params.styles}`}
        id={id ? id : undefined}
      >
        <div className="component-content">
          <div className="field-promoicon">
            <JssImage field={fields.Image} className={imageClassName} />
          </div>
          <div className="promo-text">
            {fields.Title?.value ? (
              <h1>
                <Text field={fields.Title} />
              </h1>
            ) : null}
            <div>
              <div className="field-promotext">
                <JssRichText field={fields.Text} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <ImageTextDefault {...props} />;
};

export const ImageRight = (props: ImageTextProps): JSX.Element => {
  const { params, fields } = props;
  const id = params.RenderingIdentifier;
  if (fields) {
    return (
      <div className={`component image-text ${params.styles} image-right`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="promo-text">
            {fields.Title?.value ? (
              <h1>
                <Text field={fields.Title} />
              </h1>
            ) : null}
            <div className="field-promoicon mobile-only">
              <JssImage field={fields.Image} />
            </div>
            <div>
              <div className="field-promotext">
                <JssRichText field={fields.Text} />
              </div>
            </div>
          </div>
          <div className="field-promoicon desktop-only">
            <JssImage field={fields.Image} />
          </div>
        </div>
      </div>
    );
  }

  return <ImageTextDefault {...props} />;
};

export const ImageTextInfo = (props: ImageTextProps) => (
  <Default
    {...props}
    className="image-text-info col-xxl-8 me-xxl-auto ms-xxl-auto margin-bottom-large margin-bottom-sm-mobile"
    imageClassName="logo-about-us"
  />
);
