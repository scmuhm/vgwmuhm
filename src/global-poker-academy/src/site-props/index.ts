import withSiteProps from './hoc/withSiteProps';

export type { SitePropsCollection } from './types';
export {
  SitePropsContext as SitePropsReactContext,
  SitePropsContextProvider as SitePropsContext,
} from './site-props-context';
export type { SitePropsContextProps } from './site-props-context';
export { SitePropsService } from './services/site-props-service';
export { SitePropsPlugin } from './plugins/site-props-plugin';
export type { DocumentFactory } from './plugins/site-props-plugin';
export { useSiteProps } from './hooks/useSiteProps';

export { withSiteProps };
