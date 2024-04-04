import {
  Link,
  LinkField,
  ImageField,
  RichTextField,
  RichText,
  Image,
} from '@sitecore-jss/sitecore-jss-nextjs';

import CN from 'vgw/_shared/utils/classNames';
import buttonStyles from 'vgw/_shared/components/Button/styles.module.scss';

import styles from './styles.module.scss';

type BannerHalfProps = {
  fields: {
    Image: ImageField;
    Content: RichTextField;
    CTA: LinkField;
  };
};

export const Default = (props: BannerHalfProps): JSX.Element => {
  const { fields } = props;

  if (!fields) return <></>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.image}>
          <Image field={fields.Image} />
        </div>

        <div className={CN(styles.content, 'rich-text')}>
          <RichText field={fields.Content} />

          {fields.CTA?.value.href && fields.CTA?.value.text && (
            <Link
              field={fields.CTA}
              className={CN(
                buttonStyles.button,
                buttonStyles['body-4'],
                buttonStyles['brand-1'],
                styles.CTA
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};
