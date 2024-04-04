import {
  ComponentParams,
  Text,
  TextField,
  RichTextField,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';

import CN from 'vgw/_shared/utils/classNames';
import { Body } from 'vgw/_shared/components/Typography';

import styles from './styles.module.scss';

import { useState } from 'react';

type BannerFullProps = {
  fields: {
    Title: TextField;
    Content: RichTextField;
  };
  params: ComponentParams;
};

export const Default = (props: BannerFullProps): JSX.Element => {
  const { fields } = props;

  const [isOpen, setIsOpen] = useState(Boolean(props.params?.DefaultOpen));

  if (!fields) return <></>;

  return (
    <div
      className={CN(
        'component',
        styles.container,
        props.params?.Styles?.trimEnd(),
        isOpen && styles.open
      )}
    >
      <div className={styles.title} onClick={() => setIsOpen((prev) => !prev)}>
        <Body size={2} className={styles.heading}>
          <Text field={fields.Title} />
        </Body>
      </div>
      <div className={CN('rich-text', styles.content)}>
        <RichText field={fields.Content} />
      </div>
    </div>
  );
};
