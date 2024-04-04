import { createElement, ReactNode } from 'react';
import CN from 'vgw/_shared/utils/classNames';

import styles from './styles.module.scss';

type HeadingProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6 | 'callout';
  component?: keyof HTMLElementTagNameMap;
  children: ReactNode;
  className?: string;
  color?: 'lightest' | 'darkest';
};

type BodyProps = {
  size: 1 | 2 | 3 | 4;
  component?: keyof HTMLElementTagNameMap;
  children: ReactNode;
  className?: string;
  color?: 'lightest' | 'darkest';
};

export const Heading = ({
  level,
  color,
  component,
  className,
  children,
}: HeadingProps): JSX.Element => {
  const Component = component || typeof level === 'number' ? `h${level}` : 'h1';
  return createElement(
    Component,
    {
      className: CN(className, styles.heading, styles[`heading-${level}`], color && styles[color]),
    },
    children
  );
};

export const Body = ({
  size,
  color,
  component = 'p',
  className,
  children,
}: BodyProps): JSX.Element => {
  return createElement(
    component,
    { className: CN(className, styles[`body-${size}`], color && styles[color]) },
    children
  );
};
