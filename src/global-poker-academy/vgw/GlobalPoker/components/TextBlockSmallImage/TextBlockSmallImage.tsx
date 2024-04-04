import {
  ComponentParams,
  Image,
  ImageField,
  RichText,
  RichTextField,
  TextField,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Heading } from 'vgw/_shared/components/Typography';
import CN from 'vgw/_shared/utils/classNames';

import styles from './styles.module.scss';

type BannerFullProps = {
  fields: {
    heading: TextField;
    text: RichTextField;
    image: ImageField;
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
        styles.container,
        props.params?.Styles?.trimEnd(),
        props.reverse && styles.reverse
      )}
    >
      <div className={styles.wrapper}>
        <div className={styles.textBlock}>
          <Heading className={styles.heading} level={3}>
            <Text field={fields.heading} />
          </Heading>
          <div className={styles.text}>
            <RichText field={fields.text} />
          </div>
        </div>
        <div className={styles.image}>
          <Image field={fields.image} />
        </div>
      </div>
    </div>
  );
};

export const TextBlockSmallImageRight = (props: BannerFullProps): JSX.Element => {
  return <Default {...props} reverse />;
};
