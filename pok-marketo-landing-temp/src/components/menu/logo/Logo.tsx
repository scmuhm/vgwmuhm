import React from 'react';
import NextImage from 'next/image';
import styles from './logo.module.css'

export const Logo = (props: {className: string}) => {
  return (
    <div className={`${styles.imgContainer} ${props.className}`}>
      <a className={styles.logoLink} href='/'>
          <NextImage
              width={115}
              height={47}
              src="/crm/global/images/menu/gp-vertical-white-logo.png"
              alt="Global Poker Logo"
              aria-label="Global Poker Logo"
          />
      </a>
    </div>
  );
};
