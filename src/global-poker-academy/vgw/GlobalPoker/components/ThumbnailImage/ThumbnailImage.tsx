import { ComponentParams, Image, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import CN from 'vgw/_shared/utils/classNames';

import styles from './styles.module.scss';

type ThumbnailImageProps = {
  fields: {
    image: ImageField;
  };
  params: ComponentParams;
};

export const Default = (props: ThumbnailImageProps): JSX.Element => {
  const { fields } = props;

  if (!fields) return <></>;

  return (
    <div className={CN('component', styles.container, props.params?.Styles?.trimEnd())}>
      <Image field={fields.image} />
    </div>
  );
};
