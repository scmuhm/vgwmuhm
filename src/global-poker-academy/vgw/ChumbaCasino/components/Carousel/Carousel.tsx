import { ReactNode, useEffect, useRef, useState } from 'react';
import CN from 'vgw/_shared/utils/classNames';
import styles from './styles.module.scss';

interface CarouselProps {
  children: ReactNode;
  className?: string;
  hasArrowIndicators?: boolean;
  isFullWidth?: boolean;
  autoPlay?: boolean;
  hasIndicators?: boolean;
  arrowIndicatorsStyling?: string;
  controlPanelPositioning?: 'above' | 'below';
  slidesPerView?: number;
  slidesPerPage?: number;
}

export const SliderPrevBtn = ({ onClick }: { onClick: () => void }) => (
  <div className={CN(styles.customNavigation, styles.customPrevBtn)} onClick={onClick}>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="41" viewBox="0 0 32 41" fill="none">
      <path
        d="M32 34.6165C32 37.9302 29.3137 40.6165 26 40.6165L0 40.6165L3.49691e-06 0.616452L26 0.616455C29.3137 0.616455 32 3.30275 32 6.61646L32 34.6165Z"
        fill="black"
        fill-opacity="0.6"
      />
      <path
        d="M19.4671 11.1426C19.636 11.3083 19.77 11.5052 19.8615 11.7219C19.9529 11.9386 20 12.1708 20 12.4054C20 12.64 19.9529 12.8723 19.8615 13.089C19.77 13.3057 19.636 13.5025 19.4671 13.6682L12.3963 20.618L19.4671 27.5678C19.8078 27.9027 19.9992 28.357 19.9992 28.8306C19.9992 29.3042 19.8078 29.7585 19.4671 30.0934C19.1263 30.4283 18.6642 30.6165 18.1823 30.6165C17.7004 30.6165 17.2383 30.4283 16.8975 30.0934L8.53293 21.8718C8.36399 21.7061 8.22997 21.5093 8.13852 21.2926C8.04707 21.0759 8 20.8436 8 20.6091C8 20.3745 8.04707 20.1422 8.13852 19.9255C8.22997 19.7088 8.36399 19.512 8.53293 19.3463L16.8975 11.1247C17.59 10.4441 18.7563 10.4441 19.4671 11.1426Z"
        fill="white"
      />
    </svg>
  </div>
);

export const SliderNextBtn = ({ onClick }: { onClick: () => void }) => (
  <div className={CN(styles.customNavigation, styles.customNextBtn)} onClick={onClick}>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="41" viewBox="0 0 32 41" fill="none">
      <path
        d="M0 6.61645C0 3.30275 2.68629 0.616455 6 0.616455L32 0.616455L32 40.6165L6 40.6165C2.68629 40.6165 0 37.9302 0 34.6165L0 6.61645Z"
        fill="black"
        fill-opacity="0.6"
      />
      <path
        d="M12.5329 11.1426C12.364 11.3083 12.23 11.5052 12.1385 11.7219C12.0471 11.9386 12 12.1708 12 12.4054C12 12.64 12.0471 12.8723 12.1385 13.089C12.23 13.3057 12.364 13.5025 12.5329 13.6682L19.6037 20.618L12.5329 27.5678C12.1922 27.9027 12.0008 28.357 12.0008 28.8306C12.0008 29.3042 12.1922 29.7585 12.5329 30.0934C12.8737 30.4283 13.3358 30.6165 13.8177 30.6165C14.2996 30.6165 14.7617 30.4283 15.1025 30.0934L23.4671 21.8718C23.636 21.7061 23.77 21.5093 23.8615 21.2926C23.9529 21.0759 24 20.8436 24 20.6091C24 20.3745 23.9529 20.1422 23.8615 19.9255C23.77 19.7088 23.636 19.512 23.4671 19.3463L15.1025 11.1247C14.41 10.4441 13.2437 10.4441 12.5329 11.1426Z"
        fill="white"
      />
    </svg>
  </div>
);

const SINGLE_SLIDE_VIEW_BREAKPOINT = 720;

export function Carousel({
  children,
  className,
  hasArrowIndicators,
  isFullWidth,
  autoPlay,
  hasIndicators = true,
  controlPanelPositioning = 'below',
  slidesPerView = 2,
  slidesPerPage,
}: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [carouselChildren, setCarouselChildren] = useState<Element[]>([]);
  const [slidesNumberForView, setSlidesNumberForView] = useState<number>(slidesPerView);

  const [containerWidth, setContainerWidth] = useState<number>();
  const [childWidth, setChildWidth] = useState<number>(100);

  const itemsPerPage =
    slidesPerPage ?? Math.max(Math.floor((containerWidth ?? 100) / (childWidth ?? 100)), 1);

  const pageCount = Math.max(Math.ceil(carouselChildren.length / itemsPerPage), 1);

  const [pageIndex, setPageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    const child = container?.firstElementChild;
    if (!container || !child) return;

    setCarouselChildren([...container.children]);

    // initial widths
    setContainerWidth(container.clientWidth);
    setChildWidth(child.clientWidth);

    // responsive container width
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      if (entry.contentRect.width <= SINGLE_SLIDE_VIEW_BREAKPOINT) {
        setSlidesNumberForView(1);
      }

      setContainerWidth(entry.contentRect.width);
    });

    resizeObserver.observe(container);
    return () => resizeObserver.unobserve(container);
  }, [children]);

  function onScroll() {
    const container = containerRef.current;
    if (!container) return;

    const scrollPercentage = container.scrollLeft / (container.scrollWidth - container.offsetWidth);
    const index = Math.round(scrollPercentage * (pageCount - 1));
    if (index !== pageIndex) {
      setPageIndex(index);
    }
  }

  function scrollToPage(index: number) {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({
      left: index * childWidth,
      behavior: 'smooth',
    });
    setPageIndex(index);
  }

  function handleNext() {
    const newIndex = (pageIndex + 1) % pageCount;
    scrollToPage(newIndex);
  }

  function handlePrev() {
    let newIndex;
    newIndex = (pageIndex - slidesNumberForView + pageCount) % pageCount;
    if (pageIndex <= slidesNumberForView && pageIndex > 0) {
      // Special case: we're on the last slide
      newIndex = pageIndex - 1;
    }

    scrollToPage(newIndex);
  }

  function handlePlayPause() {
    setIsPlaying(!isPlaying);
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isPlaying && autoPlay) {
      intervalId = setInterval(handleNext, 6000);
    }

    return () => clearInterval(intervalId);
  }, [isPlaying, pageIndex]);

  const showControlPanel = hasArrowIndicators || autoPlay || hasIndicators;
  const carouselColumnReverse =
    controlPanelPositioning === 'above' ? styles.carouselColumnReverse : '';

  return (
    <div className={`${styles.carousel} ${className} ${carouselColumnReverse}`}>
      {hasArrowIndicators && (
        <>
          <SliderPrevBtn onClick={handlePrev} />
          <SliderNextBtn onClick={handleNext} />
        </>
      )}
      {showControlPanel ? (
        <div className={styles.indicatorsWrapper}>
          {hasIndicators && (
            <div className={styles.indicators}>
              {[...Array(pageCount).keys()].map((_, i) => (
                <button
                  key={i}
                  className={`${styles.indicator} ${pageIndex === i && styles.active}`}
                  onClick={() => scrollToPage(i)}
                />
              ))}
            </div>
          )}
          {autoPlay ? (
            isPlaying ? (
              <button onClick={handlePlayPause} className={styles.pauseButton}>
                <svg viewBox={'0 0 30 30'} width={'100%'} height={'28px'} fill={'white'}>
                  <g>
                    <path d="M12.8571 9.64286C12.8571 9.05112 12.3775 8.57143 11.7857 8.57143C11.194 8.57143 10.7143 9.05112 10.7143 9.64286V20.3571C10.7143 20.9489 11.194 21.4286 11.7857 21.4286C12.3775 21.4286 12.8571 20.9489 12.8571 20.3571V9.64286ZM19.2857 9.64286C19.2857 9.05112 18.806 8.57143 18.2143 8.57143C17.6226 8.57143 17.1429 9.05112 17.1429 9.64286V20.3571C17.1429 20.9489 17.6226 21.4286 18.2143 21.4286C18.806 21.4286 19.2857 20.9489 19.2857 20.3571V9.64286Z" />
                    <path d="M15 2.14286C17.5429 2.14286 20.0287 2.89691 22.143 4.30968C24.2574 5.72244 25.9053 7.73045 26.8785 10.0798C27.8516 12.4291 28.1062 15.0143 27.6101 17.5083C27.114 20.0023 25.8895 22.2933 24.0914 24.0914C22.2933 25.8895 20.0023 27.114 17.5083 27.6101C15.0143 28.1062 12.4291 27.8516 10.0798 26.8784C7.73046 25.9053 5.72244 24.2574 4.30968 22.143C2.89692 20.0287 2.14286 17.5429 2.14286 15C2.14286 11.5901 3.49745 8.31981 5.90863 5.90863C8.31981 3.49744 11.5901 2.14286 15 2.14286ZM15 0C12.0333 0 9.13319 0.879735 6.66645 2.52796C4.19971 4.17618 2.27713 6.51886 1.14181 9.25975C0.00649929 12.0006 -0.290551 15.0166 0.288228 17.9264C0.867006 20.8361 2.29562 23.5088 4.3934 25.6066C6.49119 27.7044 9.16394 29.133 12.0737 29.7118C14.9834 30.2906 17.9994 29.9935 20.7403 28.8582C23.4811 27.7229 25.8238 25.8003 27.472 23.3336C29.1203 20.8668 30 17.9667 30 15C30 11.0218 28.4196 7.20644 25.6066 4.3934C22.7936 1.58035 18.9783 0 15 0Z" />
                  </g>
                </svg>
              </button>
            ) : (
              <button onClick={handlePlayPause} className={styles.playButton}>
                <svg viewBox={'0 0 30 30'} width={'100%'} height={'28px'} fill={'white'}>
                  <g>
                    <path d="M10.7143 9.33267C10.7145 9.1959 10.7528 9.06171 10.8252 8.94416C10.8975 8.82661 11.0013 8.73003 11.1256 8.66453C11.2498 8.59904 11.39 8.56705 11.5315 8.57191C11.673 8.57677 11.8105 8.6183 11.9296 8.69216L20.7303 14.1563C20.8418 14.2253 20.9334 14.3203 20.997 14.4324C21.0605 14.5446 21.0937 14.6705 21.0937 14.7983C21.0937 14.9262 21.0605 15.052 20.997 15.1642C20.9334 15.2764 20.8418 15.3714 20.7303 15.4404L11.9296 20.906C11.8105 20.9799 11.673 21.0214 11.5315 21.0263C11.39 21.0312 11.2498 20.9992 11.1256 20.9337C11.0013 20.8682 10.8975 20.7716 10.8252 20.6541C10.7528 20.5365 10.7145 20.4023 10.7143 20.2655V9.33267Z" />
                    <path d="M0 15C0 6.71591 6.71591 0 15 0C23.2841 0 30 6.71591 30 15C30 23.2841 23.2841 30 15 30C6.71591 30 0 23.2841 0 15ZM15 2.04545C11.5642 2.04545 8.2692 3.4103 5.83975 5.83975C3.4103 8.2692 2.04545 11.5642 2.04545 15C2.04545 18.4358 3.4103 21.7308 5.83975 24.1602C8.2692 26.5897 11.5642 27.9545 15 27.9545C18.4358 27.9545 21.7308 26.5897 24.1602 24.1602C26.5897 21.7308 27.9545 18.4358 27.9545 15C27.9545 11.5642 26.5897 8.2692 24.1602 5.83975C21.7308 3.4103 18.4358 2.04545 15 2.04545Z" />
                  </g>
                </svg>
              </button>
            )
          ) : null}
        </div>
      ) : null}
      <div
        ref={containerRef}
        className={`${styles.items} ${isFullWidth && styles.itemFullWidth}`}
        onScroll={onScroll}
        style={{ '--item-width': `${100 / slidesNumberForView}%` } as React.CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}
