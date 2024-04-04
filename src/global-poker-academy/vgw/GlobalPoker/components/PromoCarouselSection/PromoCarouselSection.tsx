import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
  RichText,
  RichTextField,
} from '@sitecore-jss/sitecore-jss-nextjs';

import { Carousel } from 'vgw/GlobalPoker/components/LegacyCarousel/LegacyCarousel';
import CN from 'vgw/_shared/utils/classNames';
import styles from './styles.module.scss';

type PromoCarouselSectionProps = {
  fields: {
    text: RichTextField;
  };
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
};

const PromoCarouselSection = (props: PromoCarouselSectionProps): JSX.Element => {
  const phKey = `carousel-section-${props.params.DynamicPlaceholderId}`;

  return (
    <div className={CN('component', styles.container, props.params?.Styles?.trimEnd())}>
      <div className={CN(styles.text, 'rich-text')}>
        <RichText field={props.fields.text} />
      </div>

      <Carousel arrowIndicatorsStyling={styles.arrowIndicators}>
        <Placeholder name={phKey} rendering={props.rendering} />
      </Carousel>
    </div>
  );
};

export default PromoCarouselSection;
