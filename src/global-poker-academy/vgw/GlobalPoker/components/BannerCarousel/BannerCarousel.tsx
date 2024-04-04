import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';

import CN from 'vgw/_shared/utils/classNames';
import styles from './styles.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';

type ComponentProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
};

const BannerCarousel = (props: ComponentProps): JSX.Element => {
  const phKey = `banner-carousel-${props.params.DynamicPlaceholderId}`;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [slideCount, setSlideCount] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetAutoSlide = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => {
          const newIndex = prev < slideCount - 1 ? prev + 1 : 0;
          wrapperRef.current?.scrollTo({ left: itemWidth * newIndex, behavior: 'smooth' });
          return newIndex;
        });
      }, 6000);
    }
  }, [isPaused, itemWidth, slideCount]);

  const scrollToSlide = useCallback(
    (slide: number) => {
      wrapperRef.current?.scrollTo({ left: itemWidth * slide, behavior: 'smooth' });
      resetAutoSlide();
    },
    [itemWidth, resetAutoSlide]
  );

  useEffect(() => {
    resetAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [slideCount, isPaused, resetAutoSlide]);

  useEffect(() => {
    if (wrapperRef.current?.firstElementChild) {
      setSlideCount(wrapperRef.current.children.length);
      setItemWidth(wrapperRef.current.firstElementChild.clientWidth);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (wrapperRef.current) {
        setActiveIndex(Math.round(wrapperRef.current.scrollLeft / itemWidth));
        resetAutoSlide();
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
  }, [itemWidth, resetAutoSlide]);

  return (
    <div className={CN('component', styles.container, props.params?.Styles?.trimEnd())}>
      <div className={styles.wrapper} ref={wrapperRef}>
        <Placeholder name={phKey} rendering={props.rendering} />
      </div>

      <div className={styles.controls}>
        <div />

        <div className={styles.bullets}>
          {Array.from({ length: slideCount }, (_, index) => {
            return (
              <div
                key={index}
                className={CN(styles.bullet, index === activeIndex && styles.active)}
                onClick={() => scrollToSlide(index)}
              />
            );
          })}
        </div>

        <div className={styles.pausePlay}>
          <button onClick={() => setIsPaused(!isPaused)}>
            {isPaused ? (
              <svg
                fill="#FFFFFF"
                width="36"
                height="36"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M 16 4 C 9.382813 4 4 9.382813 4 16 C 4 22.617188 9.382813 28 16 28 C 22.617188 28 28 22.617188 28 16 C 28 9.382813 22.617188 4 16 4 Z M 16 6 C 21.535156 6 26 10.464844 26 16 C 26 21.535156 21.535156 26 16 26 C 10.464844 26 6 21.535156 6 16 C 6 10.464844 10.464844 6 16 6 Z M 12 9.125 L 12 22.875 L 13.5 22 L 22.5 16.875 L 24 16 L 22.5 15.125 L 13.5 10 Z M 14 12.5625 L 19.96875 16 L 14 19.4375 Z" />
              </svg>
            ) : (
              <svg
                fill="#FFFFFF"
                width="36"
                height="36"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M 16 4 C 9.382813 4 4 9.382813 4 16 C 4 22.617188 9.382813 28 16 28 C 22.617188 28 28 22.617188 28 16 C 28 9.382813 22.617188 4 16 4 Z M 16 6 C 21.535156 6 26 10.464844 26 16 C 26 21.535156 21.535156 26 16 26 C 10.464844 26 6 21.535156 6 16 C 6 10.464844 10.464844 6 16 6 Z M 12 11 L 12 21 L 14 21 L 14 11 Z M 18 11 L 18 21 L 20 21 L 20 11 Z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerCarousel;
