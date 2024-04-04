import { useEffect, useState } from 'react';

export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const onScroll = () => {
    if (window.scrollY > 200) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <svg
      onClick={scrollToTop}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: visible ? 'inline' : 'none' }}
      className="scrollToTop"
    >
      <g>
        <path
          id="Vector"
          d="M10.6997 5.28967L18.7103 13.3007C19.0966 13.6869 19.0966 14.3135 18.7103 14.6997L17.7759 15.6342C17.3901 16.02 16.7652 16.0204 16.3785 15.6358L10.0002 9.28674L3.62147 15.6354C3.23483 16.0204 2.60994 16.0196 2.22412 15.6337L1.28967 14.6993C0.903442 14.3131 0.903442 13.6865 1.28967 13.3003L9.30071 5.28967C9.68694 4.90344 10.3135 4.90344 10.6997 5.28967Z"
          fill="white"
        />
      </g>
    </svg>
  );
};

export default ScrollToTopButton;
