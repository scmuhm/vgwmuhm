import {
  Text,
  TextField,
  Link,
  LinkField,
  ComponentParams,
} from '@sitecore-jss/sitecore-jss-nextjs';

import CN from 'vgw/_shared/utils/classNames';
import { Heading } from 'vgw/_shared/components/Typography';
import buttonStyles from 'vgw/_shared/components/Button/styles.module.scss';

import styles from './styles.module.scss';

type PromoTileProps = {
  fields: {
    Heading: TextField;
    CTA: LinkField;
  };
  params: ComponentParams;
};

export const PromoTile = ({ fields, params }: PromoTileProps): JSX.Element => {
  return (
    <div
      className={CN('component', styles.tile)}
      style={
        {
          backgroundImage: `url(${params?.BackgroundImage?.match(/mediaurl="([^"]+)"/)?.[1]})`,
        } as React.CSSProperties
      }
    >
      <Heading level={1} component="h3" className={styles.heading}>
        <Text field={fields.Heading} />
      </Heading>

      <Link
        field={fields.CTA}
        className={CN(buttonStyles.button, buttonStyles.black, buttonStyles['body-2'], styles.CTA)}
      />
    </div>
  );
};

export default PromoTile;
