import { ComponentParams, Link, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

import CN from 'vgw/_shared/utils/classNames';
import buttonStyles from 'vgw/_shared/components/Button/styles.module.scss';

import styles from './styles.module.scss';

type ButtonBlockProps = {
  fields: {
    CTA: LinkField;
  };
  params: ComponentParams;
};

export const Default = (props: ButtonBlockProps): JSX.Element => {
  const { fields } = props;

  if (!fields) return <></>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Link
          field={fields.CTA}
          className={CN(
            buttonStyles.button,
            props.params?.SmallButton ? buttonStyles['body-2'] : buttonStyles['body-xl'],
            props.params?.SmallButton && buttonStyles['small'],
            buttonStyles['brand-1']
          )}
        />
      </div>
    </div>
  );
};
