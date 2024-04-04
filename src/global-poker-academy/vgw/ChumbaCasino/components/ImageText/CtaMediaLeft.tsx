import { Image, RichText } from '@sitecore-jss/sitecore-jss-nextjs';

import CN from 'vgw/_shared/utils/classNames';

import { ButtonCTA } from '../CtaButtonBlock/CtaButtonBlock';
import { BannerFullProps } from './ImageText';
import styles from './styles.module.scss';

export const CtaMediaLeftComponent = (props: BannerFullProps): JSX.Element => {
  const { fields } = props;

  return (
    <div
      className={CN(
        'component',
        'MediaLeft',
        styles.twoColumnContainerCta,
        props.params.Styles?.trimEnd()
      )}
    >
      <div className={CN(styles.image, styles[props.params.Styles?.trimEnd()])}>
        <Image field={fields.Image} />
      </div>
      <div className={CN(styles.text, 'rich-text', styles.ctaContainer)}>
        <RichText field={fields.Text} />
        {fields?.Cta ? (
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
