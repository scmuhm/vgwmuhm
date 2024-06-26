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
        backgroundImageUrl && styles.hasBackgroundImage,
        props.params?.Styles?.trimEnd(),
        props.params?.LargePadding && styles.largePadding,
        props.params?.DisableMargin && styles.disableMargin
      )}
      style={{
        backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : undefined,
        backgroundColor: !backgroundImageUrl ? `#${props.params.BackgroundColor}` : undefined,
        color: props.params.TextColor ? `#${props.params.TextColor}` : undefined,
      }}
      data-component-id={props.params?.SectionName}
    >
      <Placeholder name={phKey} rendering={props.rendering} />
    </div>
  );
};
