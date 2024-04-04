import {
  DictionaryPhrases,
  ComponentPropsCollection,
  LayoutServiceData,
  SiteInfo,
  HTMLLink,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { SitePropsCollection } from 'src/site-props/types';

/**
 * Sitecore page props
 */
export type SitecorePageProps = {
  site: SiteInfo;
  locale: string;
  dictionary: DictionaryPhrases;
  componentProps: ComponentPropsCollection;
  notFound: boolean;
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
  siteProps: SitePropsCollection;
};
