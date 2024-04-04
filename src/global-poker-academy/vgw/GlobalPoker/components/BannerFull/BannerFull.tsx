import {
  Text,
  TextField,
  Link,
  LinkField,
  ImageField,
  RichTextField,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';

import { Heading } from 'vgw/_shared/components/Typography';
import CN from 'vgw/_shared/utils/classNames';
import buttonStyles from 'vgw/_shared/components/Button/styles.module.scss';

import styles from './styles.module.scss';

type BannerFullProps = {
  fields: {
    Background: ImageField;
    Heading: TextField;
    'Sub-heading': RichTextField;
    CTA: LinkField;
  };
};

export const Default = (props: BannerFullProps): JSX.Element => {
  const { fields } = props;
  if (!fields) return <></>;

  const hasSubHeading = fields['Sub-heading']?.value;

  return (
    <div
      className={styles.wrapper}
      style={{ backgroundImage: `url(${fields.Background?.value?.src})` }}
    >
      <div className={styles.container}>
        <Heading
          className={`${styles.heading} ${!hasSubHeading ? styles.noSubHeading : ''}`}
          level="callout"
        >
          <Text field={fields.Heading} />
        </Heading>

        {hasSubHeading && (
          <div className="rich-text">
            <RichText field={fields['Sub-heading']} />
          </div>
        )}

        {fields.CTA?.value.href && fields.CTA?.value.text && (
          <Link
            field={fields.CTA}
            className={CN(buttonStyles.button, buttonStyles['body-xl'], buttonStyles['brand-1'])}
          />
        )}
      </div>
    </div>
  );
};
