import { Image, RichText } from '@sitecore-jss/sitecore-jss-nextjs';

import CN from 'vgw/_shared/utils/classNames';

import { ButtonCTA } from '../CtaButtonBlock/CtaButtonBlock';
import { BannerFullProps } from './CCBanner';
import styles from './styles.module.scss';

export const CentralBannerImageLeftComponent = (props: BannerFullProps): JSX.Element => {
  const { fields } = props;

  if (!fields) {
    return <></>;
  }

  return (
    <div
      className={CN(
        'component',
        'imageLeft',
        styles.GeneralCentralBanner,
        styles.wrapper,
        props.params?.Styles?.trimEnd(),
        props.reverse && styles.reverse
      )}
      style={{
        backgroundColor: props?.params?.backgroundColor
          ? `#${props.params.backgroundColor}`
          : undefined,
      }}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.image}>
          <Image field={fields.image} />
        </div>
        <div className={CN(styles.text, 'rich-text')}>
          <RichText field={fields.text} />
          <ButtonCTA
            ctaField={fields.cta}
            params={props.params}
            customBtnWrapperClass={CN(styles.btnWrapper)}
          />
        </div>
      </div>
    </div>
  );
};
