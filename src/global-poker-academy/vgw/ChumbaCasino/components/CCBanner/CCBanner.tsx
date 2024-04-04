import {
  ComponentParams,
  Image,
  ImageField,
  LinkField,
  RichText,
  RichTextField,
} from '@sitecore-jss/sitecore-jss-nextjs';

import CN from 'vgw/_shared/utils/classNames';

import { ButtonCTA } from '../CtaButtonBlock/CtaButtonBlock';
import { CategoryPageBannerComponent } from './CategoryPageBanner';
import { CentralBannerImageLeftComponent } from './CentralBannerImageLeft';
import { FullWidthBannerImageLeftComponent } from './FullWidthBannerLeft';
import { FullWidthBannerImageRightComponent } from './FullWidthBannerRight';
import { GeneralLargeBannerComponent } from './GeneralLargeBanner';
import styles from './styles.module.scss';

export type BannerFullProps = {
  fields: {
    image: ImageField;
    text: RichTextField;
    cta: LinkField;
  };
  params: ComponentParams;
  reverse?: boolean;
};

export const Default = (props: BannerFullProps): JSX.Element => {
  const { fields } = props;

  if (!fields) {
    return <></>;
  }

  return (
    <div
      className={CN(
        'component',
        styles.GeneralCentralBanner,
        styles.wrapper,
        props.params?.Styles?.trimEnd(),
        props.reverse && styles.reverse
      )}
      style={{
        backgroundColor: props.params.backgroundColour ?? undefined,
      }}
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

        <div className={styles.image}>
          <Image field={fields.image} />
        </div>
      </div>
    </div>
  );
};

export const FullWidthBannerImageRight = FullWidthBannerImageRightComponent;
export const FullWidthBannerImageLeft = FullWidthBannerImageLeftComponent;
export const CategoryPageBanner = CategoryPageBannerComponent;
export const GeneralLargeBanner = GeneralLargeBannerComponent;
export const CentralBannerImageLeft = CentralBannerImageLeftComponent;
