import {
  ComponentParams,
  Image,
  ImageField,
  LinkField,
  RichText,
  RichTextField,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';

import CN from 'vgw/_shared/utils/classNames';

import { ButtonCTA } from '../CtaButtonBlock/CtaButtonBlock';
import styles from './styles.module.scss';

type BannerFullProps = {
  fields: {
    Image: ImageField;
    Text: RichTextField;
    CTA: LinkField;
    Cta: LinkField;
    Title: TextField;
  };
  showCta?: boolean;
  params: ComponentParams;
  reverse?: boolean;
  customClass?: string;
};

export const Default = (props: BannerFullProps): JSX.Element => {
  const { fields } = props;

  return (
    <div
      className={CN(
        'component',
        'LargeTwoColumn',
        props?.customClass,
        styles.container,
        props.params.Styles?.trimEnd()
      )}
    >
      <div className={CN(styles.text, 'rich-text', props.reverse && styles.reverse)}>
        <RichText field={fields.Text} />
      </div>
      <div className={CN(styles.image, props.reverse && styles.reverse)}>
        <Image field={fields.Image} />
      </div>
    </div>
  );
};

export const LargeMediaLeft = (props: BannerFullProps): JSX.Element => {
  return <Default {...props} customClass="MediaLeft" reverse />;
};

export const MediaRight = (props: BannerFullProps): JSX.Element => {
  const { fields, showCta } = props;

  return (
    <div
      className={CN(
        'component',
        styles.MediaRight,
        styles.twoColumnContainer,
        props.params.Styles?.trimEnd()
      )}
    >
      <div className={CN(styles.text, 'rich-text', showCta && styles.ctaContainer)}>
        <RichText field={fields.Text} />
        {showCta ? (
          <ButtonCTA
            ctaField={fields.Cta}
            params={props.params}
            customBtnWrapperClass={styles.btnWrapper}
          />
        ) : null}
      </div>
      <div className={CN(styles.image, styles[props.params.Styles?.trimEnd()])}>
        <Image field={fields.Image} />
      </div>
    </div>
  );
};

export const MediaLeft = (props: BannerFullProps): JSX.Element => {
  const { fields, showCta } = props;

  return (
    <div
      className={CN(
        'component',
        'MediaLeft',
        styles.twoColumnContainer,
        props.params.Styles?.trimEnd()
      )}
    >
      <div className={CN(styles.image, styles[props.params.Styles?.trimEnd()])}>
        <Image field={fields.Image} />
      </div>
      <div className={CN(styles.text, 'rich-text', showCta && styles.ctaContainer)}>
        <RichText field={fields.Text} />
        {showCta ? (
          <ButtonCTA
            ctaField={fields.Cta}
            params={props.params}
            customBtnWrapperClass={styles.btnWrapper}
          />
        ) : null}
      </div>
    </div>
  );
};

export const CtaMediaLeft = (props: BannerFullProps): JSX.Element => {
  return <MediaLeft {...props} showCta />;
};

export const CtaMediaRight = (props: BannerFullProps): JSX.Element => {
  return <MediaRight {...props} showCta />;
};
