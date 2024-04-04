import { SiteFooterResponse } from 'graphql/SiteFooterResponse';
import SiteNavigationResponse from 'graphql/SiteNavigationResponse';
import TopBarQueryResponse from 'graphql/TopBarResponse';
import { SitePropsCollection as PropsCollection } from 'src/site-props';

export interface SitePropsCollection
  extends PropsCollection,
    SiteNavigationResponse,
    SiteFooterResponse,
    TopBarQueryResponse {}
