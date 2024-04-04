import { ComponentParams, Link, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import CN from 'vgw/_shared/utils/classNames';

import styles from './styles.module.scss';

interface CTA {
  fields: {
    CTA: LinkField;
  };
  params: ComponentParams;
}

interface LinkButtonProps extends Partial<CTA> {
  ctaField: LinkField;
  disabled?: boolean;
  customBtnClass?: string;
  customBtnWrapperClass?: string;
}

export const ButtonCTA = (props: LinkButtonProps) => {
  const { ctaField, disabled, customBtnClass, customBtnWrapperClass } = props;
  if (!ctaField) {
    return <></>;
  }
  return (
    <div
      className={CN(
        'component',
        styles.container,
        props?.params?.Styles?.trimEnd(),
        customBtnWrapperClass,
        disabled && styles.disabled
      )}
    >
      {disabled ? (
        <span className={CN(styles.ctaBtn)}>{ctaField.value.text}</span>
      ) : (
        <Link field={ctaField} className={CN(styles.ctaBtn, customBtnClass)} />
      )}
    </div>
  );
};

export const Default = (props: CTA): JSX.Element => {
  const { fields } = props;
  if (!fields) return <></>;

  return <ButtonCTA ctaField={fields.CTA} params={props.params} />;
};
