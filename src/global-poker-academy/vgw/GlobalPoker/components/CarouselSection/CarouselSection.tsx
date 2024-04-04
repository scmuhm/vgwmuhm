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

type CarouselSectionProps = {
  fields: {
    text: RichTextField;
  };
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
};

const CarouselSection = (props: CarouselSectionProps): JSX.Element => {
  const phKey = `carousel-section-${props.params.DynamicPlaceholderId}`;

  return (
    <div className={CN('component', styles.container, props.params?.Styles?.trimEnd())}>
      <div className={CN(styles.text, 'rich-text')}>
        <RichText field={props.fields.text} />
      </div>

      <Carousel
        hasIndicators={false}
        hasArrowIndicators={true}
        arrowIndicatorsStyling={styles.arrowIndicators}
        controlPanelPositioning={'above'}
        className={styles.carouselSetHeight}
      >
        <Placeholder name={phKey} rendering={props.rendering} />
      </Carousel>
    </div>
  );
};

export default CarouselSection;
