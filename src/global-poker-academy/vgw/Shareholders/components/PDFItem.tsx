import { FileField, TextField, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';

interface Fields {
  File: FileField;
  Title: TextField;
}

type PDFItemProps = {
  fields: Fields;
};

const PDFItem = (props: PDFItemProps): JSX.Element => {
  const { fields } = props;

  if (!fields) {
    return <></>;
  }

  return (
    <div className="main-update">
      <div className="main-update-icon">
        <img
          className="main-update-icon-img"
          src="/shareholders/images/iconfinder.svg"
          alt="PDF Icon"
        />
      </div>

      <a
        className="main-update-link"
        href={fields?.File?.value?.src}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h1 className="main-update-link-text">
          <Text field={fields.Title} />
        </h1>
      </a>
    </div>
  );
};

export default PDFItem;
