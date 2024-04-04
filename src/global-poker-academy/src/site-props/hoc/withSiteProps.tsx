import { ComponentType } from 'react';
import { useSiteProps } from '../hooks/useSiteProps';
import { SitePropsCollection } from '../types';

/**
 * Site Props Higher-Order Component to inject the context
 * SitePropsCollection data as props to a component
 */
export default function withSiteProps<P, T extends SitePropsCollection = SitePropsCollection>(
  Component: ComponentType<P>
) {
  return function WithSiteProps(props: P): JSX.Element | null {
    const SiteProps = useSiteProps<T>();

    return <Component {...(props as JSX.IntrinsicAttributes & P)} {...SiteProps} />;
  };
}
