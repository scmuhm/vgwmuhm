import {
  ComponentParams,
  TextField,
  ImageField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';

import { Default as Thumbnail } from 'vgw/GlobalPoker/components/GPThumbnail/GPThumbnail';

import CN from 'vgw/_shared/utils/classNames';
import styles from './styles.module.scss';

type IconsBlocksProps = {
  fields: {
    Image1: ImageField;
    Text1: TextField;
    CTA1: LinkField;
    Image2: ImageField;
    Text2: TextField;
    CTA2: LinkField;
    Image3: ImageField;
    Text3: TextField;
    CTA3: LinkField;
    Image4: ImageField;
    Text4: TextField;
    CTA4: LinkField;
  };
  params: ComponentParams;
};

export const Default = (props: IconsBlocksProps): JSX.Element => {
  const { fields } = props;

  if (!fields) return <></>;

  return (
    <div className={CN('component', styles.container, props.params?.Styles?.trimEnd())}>
      <div className={styles.wrapper}>
        <Thumbnail fields={{ Image: fields.Image1, Text: fields.Text1, CTA: fields.CTA1 }} />
        <Thumbnail fields={{ Image: fields.Image2, Text: fields.Text2, CTA: fields.CTA2 }} />
        <Thumbnail fields={{ Image: fields.Image3, Text: fields.Text3, CTA: fields.CTA3 }} />
        <Thumbnail fields={{ Image: fields.Image4, Text: fields.Text4, CTA: fields.CTA4 }} />
      </div>
    </div>
  );
};
