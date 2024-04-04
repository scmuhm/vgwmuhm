import { Link, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import CN from 'vgw/_shared/utils/classNames';
import buttonStyles from 'vgw/_shared/components/Button/styles.module.scss';
import styles from './styles.module.scss';

type FixedMobileButtonProps = {
  fields: {
    CTA: LinkField;
  };
};

export const Default = (props: FixedMobileButtonProps): JSX.Element => {
  const { fields } = props;

  if (!fields) return <></>;

  return (
    <div>
      <Link
        field={fields.CTA}
        className={CN(buttonStyles.button, buttonStyles['brand-1'], styles.fixedButton)}
      />
    </div>
  );
};
