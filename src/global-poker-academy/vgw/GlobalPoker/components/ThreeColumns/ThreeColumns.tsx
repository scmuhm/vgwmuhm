import {
  Image,
  ImageField,
  RichTextField,
  ComponentParams,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';

import CN from 'vgw/_shared/utils/classNames';

import styles from './styles.module.scss';

type BannerFullProps = {
  fields: {
    image1: ImageField;
    text1: RichTextField;
    image2: ImageField;
    text2: RichTextField;
    image3: ImageField;
    text3: RichTextField;
  };
  params: ComponentParams;
};

export const Default = (props: BannerFullProps): JSX.Element => {
  const { fields } = props;

  if (!fields) return <></>;

  return (
    <div className={CN('component', styles.container, props.params?.Styles?.trimEnd())}>
      <div className={styles.wrapper}>
        <div className={styles.column}>
          <div className={styles.image}>
            <Image field={fields.image1} />
          </div>
          <div className="rich-text">
            <RichText field={fields.text1} />
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.image}>
            <Image field={fields.image2} />
          </div>

          <div className="rich-text">
            <RichText field={fields.text2} />
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.image}>
            <Image field={fields.image3} />
          </div>

          <div className="rich-text">
            <RichText field={fields.text3} />
          </div>
        </div>
      </div>
    </div>
  );
};
