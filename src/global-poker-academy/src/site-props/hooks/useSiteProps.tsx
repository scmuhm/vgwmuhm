import { useContext } from 'react';
import { SitePropsContext } from '../site-props-context';
import { SitePropsCollection } from '../types';

/**
 * Helper Hook to access the SitePropsCollection context
 * @returns Context Value for Site Props
 */
export function useSiteProps<T extends SitePropsCollection = SitePropsCollection>(): T {
  const context = useContext(SitePropsContext);

  return (context as T) || ({} as T);
}
