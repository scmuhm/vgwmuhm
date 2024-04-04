import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Quote: Field<string>;
}

type QuoteProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const QuoteDefault = (props: QuoteProps): JSX.Element => (
  <div className={`component quote ${props.params.styles}`}>
    <div className="component-content quote-content">
      <span>Quote</span>
    </div>
  </div>
);

export const Default = (props: QuoteProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component quote ${props.params.styles}`} id={id ? id : undefined}>
        <div
          className="component-content quote-content"
          // use class "semicolons-auto" for adding semicolons to the text before start and after end of container automatically
        >
          <span>
            <Text field={props.fields.Quote} />
          </span>
        </div>
      </div>
    );
  }

  return <QuoteDefault {...props} />;
};
