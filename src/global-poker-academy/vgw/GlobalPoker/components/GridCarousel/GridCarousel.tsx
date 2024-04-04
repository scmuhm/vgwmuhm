import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';

import { useEffect, useRef, useState } from 'react';

import CN from 'vgw/_shared/utils/classNames';
import styles from './styles.module.scss';

type GridCarouselProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
};

const GridCarousel = (props: GridCarouselProps): JSX.Element => {
  const phKey = `grid-carousel-${props.params.DynamicPlaceholderId}`;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [slidesPerPage, setSlidesPerPage] = useState(1);
  const [carouselEnd, setCarouselEnd] = useState(false);

  const scrollToSlide = (slide: number) => {
    wrapperRef.current?.scrollTo({ left: itemWidth * slide, behavior: 'smooth' });
  };

  useEffect(() => {
    if (wrapperRef.current?.firstElementChild) {
      setItemCount(wrapperRef.current.children.length);
      setItemWidth(wrapperRef.current.firstElementChild.clientWidth);
    }
  }, []);

  useEffect(() => {
    if (wrapperRef.current) {
      setSlidesPerPage(Math.floor(wrapperRef.current.clientWidth / itemWidth));
    }
  }, [itemWidth]);

  useEffect(() => {
    const handleScroll = () => {
      if (wrapperRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = wrapperRef.current;

        setCarouselEnd(Math.abs(scrollLeft) >= scrollWidth - clientWidth - 1);
        setActiveIndex(Math.round(scrollLeft / itemWidth));
      }
    };

    const { current } = wrapperRef;

    if (current) {
      current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (current) {
        current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [itemWidth]);

  return (
    <div className={CN('component', styles.container, props.params?.Styles?.trimEnd())}>
      <div className={styles.wrapper} ref={wrapperRef}>
        <Placeholder name={phKey} rendering={props.rendering} />
      </div>

      <div className={styles.controls}>
        <div />

        <div className={styles.bullets}>
          {Array.from({ length: Math.ceil(itemCount / slidesPerPage) }, (_, index) => {
            const currentPage = Math.ceil(activeIndex / slidesPerPage);
            return (
              <div
                key={index}
                className={CN(styles.bullet, index === currentPage && styles.active)}
                onClick={() => scrollToSlide(slidesPerPage * index)}
              />
            );
          })}
        </div>

        <div className={styles.navigation}>
          <button
            disabled={activeIndex === 0}
            className={CN(styles.navButton)}
            onClick={() => scrollToSlide(activeIndex - 2)}
            aria-label="navigation backward"
          >
            <svg
              width="16"
              height="16"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 69 69"
            >
              <path
                fill="black"
                d="M16.2,32.1L43.9,4.4c1.3-1.3,3.5-1.3,4.8,0l3.2,3.2c1.3,1.3,1.3,3.5,0,4.8L30,34.5l21.9,22c1.3,1.3,1.3,3.5,0,4.8l-3.2,3.2c-1.3,1.3-3.5,1.3-4.8,0L16.2,36.9C14.9,35.6,14.9,33.4,16.2,32.1L16.2,32.1z"
              />
            </svg>
          </button>
          <button
            disabled={carouselEnd}
            className={CN(styles.navButton)}
            onClick={() => scrollToSlide(activeIndex + 2)}
            aria-label="navigation forward"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 69 69"
              fill="black"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M53.9369 36.9133L26.2997 64.5503C24.9668 65.8832 22.8058 65.8832 21.4731 64.5503L18.2496 61.3269C16.919 59.9962 16.9165 57.8397 18.244 56.5059L40.1469 34.4999L18.244 12.494C16.9165 11.1603 16.919 9.00368 18.2496 7.67305L21.4731 4.44963C22.806 3.11672 24.967 3.11672 26.2997 4.44963L53.9367 32.0866C55.2696 33.4194 55.2696 35.5804 53.9369 36.9133Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GridCarousel;
