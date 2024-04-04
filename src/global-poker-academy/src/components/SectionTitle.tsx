import React from 'react';
import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Title: Field<string>;
}

type SectionTitleProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const SectionTitleDefault = (props: SectionTitleProps): JSX.Element => (
  <div className={`component quote ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">[SectionTitle]</span>
    </div>
  </div>
);

export const Default = (props: SectionTitleProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component image-text ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <h2>
            <Text field={props.fields.Title} />
          </h2>
        </div>
      </div>
    );
  }

  return <SectionTitleDefault {...props} />;
};
