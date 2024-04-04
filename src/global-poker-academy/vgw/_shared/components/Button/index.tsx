import { createElement, MouseEventHandler, ReactNode } from 'react';
import CN from 'vgw/_shared/utils/classNames';

import styles from './styles.module.scss';

type ButtonProps = {
  size: 1 | 2 | 3 | 4 | 'xl';
  component?: 'button' | 'a';
  children: ReactNode;
  color?: 'brand-1' | 'brand-2' | 'white' | 'black';
  ghost?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  href?: string;
};

export const Button = ({
  size,
  color,
  ghost,
  component = 'button',
  onClick,
  href,
  children,
}: ButtonProps): JSX.Element => {
  return createElement(
    component,
    {
      className: CN(
        styles.button,
        styles[`body-${size}`],
        color && styles[color],
        ghost && styles.ghost
      ),
      onClick,
      href,
    },
    children
  );
};
