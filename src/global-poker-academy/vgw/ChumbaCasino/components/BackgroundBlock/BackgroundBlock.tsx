import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';

import CN from 'vgw/_shared/utils/classNames';
import styles from './styles.module.scss';

type BackgroundBlockProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
};

export const Default = (props: BackgroundBlockProps): JSX.Element => {
  const phKey = `background-block-${props.params.DynamicPlaceholderId}`;
  const backgroundImage = props.params.BackgroundImage;
  const backgroundImageUrl = backgroundImage?.match(/mediaurl="([^"]+)"/)?.[1];

  return (
    <div
      className={CN(
        'component',
        styles.container,
        styles.BackgroundBlock,
        backgroundImageUrl && styles.hasBackgroundImage,
        props.params?.Styles?.trimEnd(),
        props.params?.LargePadding && styles.largePadding,
        props.params?.DisableMargin && styles.disableMargin
      )}
      style={{
        backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : undefined,
        backgroundColor: !backgroundImageUrl ? `#${props.params.backgroundColor}` : undefined,
        color: props.params.textColor ? `#${props.params.textColor}` : undefined,
      }}
    >
      <Placeholder name={phKey} rendering={props.rendering} />
    </div>
  );
};
