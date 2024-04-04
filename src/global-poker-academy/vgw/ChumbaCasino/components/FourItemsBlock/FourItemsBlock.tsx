import {
  ComponentParams,
  Image,
  ImageField,
  LinkField,
  RichText,
  RichTextField,
} from '@sitecore-jss/sitecore-jss-nextjs';

import CN from 'vgw/_shared/utils/classNames';

import { ButtonCTA } from '../CtaButtonBlock/CtaButtonBlock';
import styles from './styles.module.scss';

type BannerFullProps = {
  fields: {
    image1: ImageField;
    text1: RichTextField;
    cta1: LinkField;
    image2: ImageField;
    text2: RichTextField;
    cta2: LinkField;
    image3: ImageField;
    text3: RichTextField;
    cta3: LinkField;
    image4: ImageField;
    text4: RichTextField;
    cta4: LinkField;
  };
  params: ComponentParams;
};

export const Default = (props: BannerFullProps): JSX.Element => {
  const { fields } = props;
  if (!fields) return <></>;

  return (
    <div
      className={CN(
        'component',
        'FourItemsBlock',
        styles.container,
        props.params.Styles?.trimEnd()
      )}
    >
      <div className={styles.wrapper}>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.image}>
              <Image field={fields.image1} />
            </div>
            <div className={styles.richTextWrapper}>
              <RichText field={fields.text1} />
              <ButtonCTA
                ctaField={fields.cta1}
                params={props.params}
                customBtnClass={styles.fourItemsBtn}
                customBtnWrapperClass={styles.fourItemsBtnWrapper}
              />
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.image}>
              <Image field={fields.image2} />
            </div>
            <div className={styles.richTextWrapper}>
              <RichText field={fields.text2} />
              <ButtonCTA
                ctaField={fields.cta2}
                params={props.params}
                customBtnClass={styles.fourItemsBtn}
                customBtnWrapperClass={styles.fourItemsBtnWrapper}
              />
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.image}>
              <Image field={fields.image3} />
            </div>
            <div className={styles.richTextWrapper}>
              <RichText field={fields.text3} />
              <ButtonCTA
                ctaField={fields.cta3}
                params={props.params}
                customBtnClass={styles.fourItemsBtn}
                customBtnWrapperClass={styles.fourItemsBtnWrapper}
              />
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.image}>
              <Image field={fields.image4} />
            </div>
            <div className={styles.richTextWrapper}>
              <RichText field={fields.text4} />
              <ButtonCTA
                ctaField={fields.cta4}
                params={props.params}
                customBtnClass={styles.fourItemsBtn}
                customBtnWrapperClass={styles.fourItemsBtnWrapper}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
