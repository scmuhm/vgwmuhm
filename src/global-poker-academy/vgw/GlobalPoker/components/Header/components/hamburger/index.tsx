import React from 'react';
import styles from './styles.module.scss';

interface HamburgerIconMenuProps {
  className?: string;
  mobileMenuOpen: boolean;
  handleOnclick(): void;
}

export const HamburgerIcon: React.FC<HamburgerIconMenuProps> = ({
  className,
  mobileMenuOpen,
  handleOnclick,
}) => {
  let cssStyles = `${styles.hamburger} ${className}`;
  if (mobileMenuOpen) cssStyles += ` ${styles.cross}`;

  return (
    <div className={cssStyles} onClick={handleOnclick}>
      <span className={`${styles.line} ${styles.one}`} />
      <span className={`${styles.line} ${styles.two}`} />
      <span className={`${styles.line} ${styles.three}`} />
      <span className={`${styles.line} ${styles.four}`} />
    </div>
  );
};

export default HamburgerIcon;
