import {
  LinkField,
  Text,
  TextField,
  ComponentParams,
  Link,
} from '@sitecore-jss/sitecore-jss-nextjs';

import CN from 'vgw/_shared/utils/classNames';
import buttonStyles from 'vgw/_shared/components/Button/styles.module.scss';
import styles from './styles.module.scss';
import { Heading } from 'vgw/_shared/components/Typography';

type FullWidthCTABannerProps = {
  fields: {
    heading: TextField;
    CTA: LinkField;
  };
  params: ComponentParams;
};

export const Default = (props: FullWidthCTABannerProps): JSX.Element => {
  const { params } = props;

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
        <Heading level={2} className={styles.heading}>
          <Text field={props.fields.heading} />
        </Heading>

        <Link
          field={props.fields.CTA}
          className={CN(buttonStyles.button, buttonStyles.black, buttonStyles['body-4'])}
        />
      </div>
    </div>
  );
};
