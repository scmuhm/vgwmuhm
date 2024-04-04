import {
  ComponentParams,
  Image,
  ImageField,
  RichText,
  RichTextField,
} from '@sitecore-jss/sitecore-jss-nextjs';

import CN from 'vgw/_shared/utils/classNames';
import styles from './styles.module.scss';

type ImageBlockProps = {
  fields: {
    Image: ImageField;
    Caption: RichTextField;
  };
  params: ComponentParams;
};

export const Default = (props: ImageBlockProps): JSX.Element => {
  const { fields } = props;

  if (!fields) return <></>;

  return (
    <div className={CN('component', styles.container, props.params?.Styles?.trimEnd())}>
      <div>
        <Image field={fields.Image} />

        {props.params?.AddCaption && (
          <RichText className={CN('rich-text')} field={fields.Caption} />
        )}
      </div>
    </div>
  );
};
