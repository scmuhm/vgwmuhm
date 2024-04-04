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

import { CtaMediaLeftComponent } from './CtaMediaLeft';
import { CtaMediaRightComponent } from './CtaMediaRight';
import { MediaLeftComponent } from './MediaLeft';
import { MediaRightComponent } from './MediaRight';
import styles from './styles.module.scss';

export type BannerFullProps = {
  fields: {
    Image: ImageField;
    Text: RichTextField;
    CTA: LinkField;
    Cta: LinkField;
    Title: TextField;
  };
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
        styles.LargeTwoColumn,
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

export const MediaLeft = MediaLeftComponent;
export const MediaRight = MediaRightComponent;
export const CtaMediaLeft = CtaMediaLeftComponent;
export const CtaMediaRight = CtaMediaRightComponent;
