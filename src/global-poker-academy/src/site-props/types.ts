import { SitecorePageProps } from 'lib/page-props';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';

export interface SitePropsCollection {
  [key: string]: unknown;
}

export interface Plugin {
  /**
   * Detect order when the plugin should be called, e.g. 0 - will be called first (can be a plugin which data is required for other plugins)
   */
  order: number;
  /**
   * A function which will be called during page props generation
   */
  exec(
    props: SitecorePageProps,
    context: GetServerSidePropsContext | GetStaticPropsContext
  ): Promise<SitecorePageProps>;
}
