import { Image, RichText } from '@sitecore-jss/sitecore-jss-nextjs';

import CN from 'vgw/_shared/utils/classNames';

import React from 'react';
import { ButtonCTA } from '../CtaButtonBlock/CtaButtonBlock';
import { BannerFullProps } from './CCBanner';
import styles from './styles.module.scss';

export const CategoryPageBannerComponent = (props: BannerFullProps) => {
  const { fields, params } = props;

  if (!fields) {
    return <></>;
  }
  return (
    <div
      className={CN(
        'component',
        styles.CategoryPageBanner,
        styles.wrapper,
        params?.Styles?.trimEnd()
      )}
      style={
        {
          '--BackgroundImageMobileUrl': `url(${
            params.backgroundImageMobile?.match(/mediaurl="([^"]+)"/)?.[1]
          })`,
          '--BackgroundImageTabletUrl': `url(${
            params.backgroundImageTablet?.match(/mediaurl="([^"]+)"/)?.[1]
          })`,
          '--BackgroundImageDesktopUrl': `url(${
            params.backgroundImageDesktop?.match(/mediaurl="([^"]+)"/)?.[1]
          })`,
        } as React.CSSProperties
      }
    >
      <div className={styles.contentWrapper}>
        <div className={CN(styles.text, 'rich-text')}>
          <RichText field={fields.text} />
          <ButtonCTA
            ctaField={fields.cta}
            params={props.params}
            customBtnWrapperClass={CN(styles.btnWrapper)}
          />
        </div>
      </div>
      <div className={styles.image}>
        <Image field={fields.image} />
      </div>
    </div>
  );
};
