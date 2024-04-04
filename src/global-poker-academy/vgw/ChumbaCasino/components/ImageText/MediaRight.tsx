import { Image, RichText } from '@sitecore-jss/sitecore-jss-nextjs';

import CN from 'vgw/_shared/utils/classNames';

import { BannerFullProps } from './ImageText';
import styles from './styles.module.scss';

export const MediaRightComponent = (props: BannerFullProps): JSX.Element => {
  const { fields } = props;

  return (
    <div
      className={CN(
        'component',
        styles.MediaRight,
        styles.twoColumnContainer,
        props.params.Styles?.trimEnd()
      )}
    >
      <div className={CN(styles.text, 'rich-text')}>
        <RichText field={fields.Text} />
      </div>
      <div className={CN(styles.image, styles[props.params.Styles?.trimEnd()])}>
        <Image field={fields.Image} />
      </div>
    </div>
  );
};
