import {
  ComponentParams,
  Link,
  LinkField,
  RichText,
  RichTextField,
} from '@sitecore-jss/sitecore-jss-nextjs';

import CN from 'vgw/_shared/utils/classNames';
import buttonStyles from 'vgw/_shared/components/Button/styles.module.scss';
import styles from './styles.module.scss';

type TextButtonComboProps = {
  fields: {
    text: RichTextField;
    CTA1: LinkField;
    CTA2: LinkField;
    CTA3: LinkField;
    CTA4: LinkField;
  };
  params: ComponentParams;
  reverse?: boolean;
};

export const Default = (props: TextButtonComboProps): JSX.Element => {
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
      <div className={styles.content}>
        <div className={CN(styles.text, 'rich-text')}>
          <RichText field={fields.text} />
        </div>
        <div className={styles.buttonBox}>
          <Link
            field={fields.CTA1}
            className={CN(
              buttonStyles.button,
              buttonStyles.black,
              buttonStyles['body-4'],
              styles.CTA
            )}
          />
          <Link
            field={fields.CTA2}
            className={CN(
              buttonStyles.button,
              buttonStyles.black,
              buttonStyles['body-4'],
              styles.CTA
            )}
          />
          <Link
            field={fields.CTA3}
            className={CN(
              buttonStyles.button,
              buttonStyles.black,
              buttonStyles['body-4'],
              styles.CTA
            )}
          />
          <Link
            field={fields.CTA4}
            className={CN(
              buttonStyles.button,
              buttonStyles.black,
              buttonStyles['body-4'],
              styles.CTA
            )}
          />
        </div>
      </div>
      <div className={styles.empty}></div>
    </div>
  );
};

export const TextButtonComboRight = (props: TextButtonComboProps): JSX.Element => {
  return <Default {...props} reverse />;
};
