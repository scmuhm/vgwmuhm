import {
  Text,
  TextField,
  Image,
  ImageField,
  Link,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';

import CN from 'vgw/_shared/utils/classNames';
import styles from './styles.module.scss';

type ThumbnailProps = {
  fields: {
    Image: ImageField;
    Text: TextField;
    CTA: LinkField;
  };
};

export const Default = ({ fields }: ThumbnailProps): JSX.Element => {
  return (
    <div className={CN('component', styles.column)}>
      <Image field={fields.Image} />
      {fields.Text.value && (
        <div className={styles.text}>
          <Text field={fields.Text} />
        </div>
      )}
      {fields.CTA?.value.href && fields.CTA?.value.text && (
        <div className={styles.overlay}>
          <Link field={fields.CTA} className={CN(styles.CTA)} />
        </div>
      )}
    </div>
  );
};
