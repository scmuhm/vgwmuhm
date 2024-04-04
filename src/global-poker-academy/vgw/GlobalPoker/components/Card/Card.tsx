import {
  ComponentParams,
  Text,
  TextField,
  Image,
  ImageField,
  Link,
  LinkField,
  RichTextField,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';

import CN from 'vgw/_shared/utils/classNames';
import styles from './styles.module.scss';
import { Heading } from 'vgw/_shared/components/Typography';

type CardProps = {
  fields: {
    Image: ImageField;
    Text1: TextField;
    Text2: RichTextField;
    CTA: LinkField;
  };
  params: ComponentParams;
};

export const Default = (props: CardProps): JSX.Element => {
  const { fields } = props;

  return (
    <div className={CN('component', styles.wrapper)}>
      <div className={styles.imageWrapper}>
        <Image field={fields.Image} className={styles.image} />
        {fields.Text1?.value && (
          <Heading level={2} className={styles.overlay}>
            <Text field={fields.Text1} />
          </Heading>
        )}
      </div>
      <div className={styles.textContent}>
        <RichText field={fields.Text2} />
        {fields.CTA?.value.href && fields.CTA?.value.text && (
          <Link
            field={fields.CTA}
            className={CN(styles.CTA, props.params?.CenterCTA && styles.centeredCTA)}
          />
        )}
      </div>
    </div>
  );
};
