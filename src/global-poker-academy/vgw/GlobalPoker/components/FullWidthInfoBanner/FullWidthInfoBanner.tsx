import {
  Text,
  TextField,
  Link,
  LinkField,
  RichText,
  RichTextField,
  ComponentParams,
} from '@sitecore-jss/sitecore-jss-nextjs';

import { Heading } from 'vgw/_shared/components/Typography';
import CN from 'vgw/_shared/utils/classNames';
import buttonStyles from 'vgw/_shared/components/Button/styles.module.scss';

import styles from './styles.module.scss';

type BannerFullProps = {
  fields: {
    Heading: TextField;
    'Sub-heading': RichTextField;
    CTA: LinkField;
  };
  params: ComponentParams;
};

export const Default = (props: BannerFullProps): JSX.Element => {
  const { fields, params } = props;

  if (!fields) return <></>;

  const hasSubHeading = fields['Sub-heading']?.value;

  return (
    <div
      className={CN('component', styles.wrapper, params?.Styles?.trimEnd())}
      style={
        {
          '--BackgroundImageMobileUrl': `url(${
            params.BackgroundImageMobile?.match(/mediaurl="([^"]+)"/)?.[1]
          })`,
          '--BackgroundImageTabletUrl': `url(${
            params.BackgroundImageTablet?.match(/mediaurl="([^"]+)"/)?.[1]
          })`,
          '--BackgroundImageDesktopUrl': `url(${
            params.BackgroundImageDesktop?.match(/mediaurl="([^"]+)"/)?.[1]
          })`,
        } as React.CSSProperties
      }
    >
      <div className={styles.container}>
        <Heading
          className={`${styles.heading} ${!hasSubHeading ? styles.noSubHeading : ''}`}
          level={2}
        >
          <Text field={fields.Heading} />
        </Heading>

        {hasSubHeading && (
          <div className={CN('rich-text', styles.subheading)}>
            <RichText field={fields['Sub-heading']} />
          </div>
        )}

        {fields.CTA?.value.href && fields.CTA?.value.text && (
          <Link
            field={fields.CTA}
            className={CN(buttonStyles.button, buttonStyles['body-4'], buttonStyles['brand-1'])}
          />
        )}
      </div>
    </div>
  );
};
