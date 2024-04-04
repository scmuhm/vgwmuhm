import {
  ComponentParams,
  Image,
  ImageField,
  RichText,
  RichTextField,
} from '@sitecore-jss/sitecore-jss-nextjs';

import CN from 'vgw/_shared/utils/classNames';

import styles from './styles.module.scss';

type BannerFullProps = {
  fields: {
    image: ImageField;
    text: RichTextField;
  };
  params: ComponentParams;
  reverse?: boolean;
};

export const Default = (props: BannerFullProps): JSX.Element => {
  const { fields } = props;

  return (
    <div
      className={CN(
        'component',
        styles.wrapper,
        props.params?.Styles?.trimEnd(),
        props.reverse && styles.reverse
      )}
    >
      <div className={styles.image}>
        <Image field={fields.image} />
      </div>
      <div className={CN(styles.text, 'rich-text')}>
        <RichText field={fields.text} />
      </div>
    </div>
  );
};

export const GPImageRight = (props: BannerFullProps): JSX.Element => {
  return <Default {...props} reverse />;
};
