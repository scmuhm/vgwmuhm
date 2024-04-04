import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import styles from './styles.module.scss';

import CN from 'vgw/_shared/utils/classNames';
import { Carousel } from '../Carousel/Carousel';

type SingleGamesPageCarouselProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
};
const SingleGamesPageCarousel = (props: SingleGamesPageCarouselProps): JSX.Element => {
  const phKey = `single-games-page-carousel-${props.params.DynamicPlaceholderId}`;
  return (
    <div className={CN('component', styles.container, props.params?.Styles?.trimEnd())}>
      <Carousel
        hasIndicators={true}
        hasArrowIndicators={true}
        arrowIndicatorsStyling={styles.arrowIndicators}
        controlPanelPositioning={'above'}
        className={styles.carouselSetHeight}
        slidesPerView={2}
        slidesPerPage={1}
      >
        <Placeholder name={phKey} rendering={props.rendering} />
      </Carousel>
    </div>
  );
};

export default SingleGamesPageCarousel;
