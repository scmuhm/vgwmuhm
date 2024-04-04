import { LayoutServiceData } from '@sitecore-jss/sitecore-jss-nextjs';
import { BatchRequestDocument, Variables, BatchRequestsOptions } from 'graphql-request';

import { SitePropsService } from '../services/site-props-service';

import { SitePropsCollection, Plugin } from '../types';
import { SitecorePageProps } from 'lib/page-props';
import { GraphQLBatchRequestClient } from '../batchGraphqlClient';

export type DocumentFactory = (layoutData: LayoutServiceData) => BatchRequestDocument<Variables>[];

/**
 * A Sitecore page-props-factory plugin that
 * uses GlobalPropsService to fetch GraphQL requests using
 * batching and sets a props.globalProps for the page.
 */
export class SitePropsPlugin implements Plugin {
  private sitePropsService: SitePropsService;

  constructor(
    public order: number,
    protected client: GraphQLBatchRequestClient,
    protected factory: DocumentFactory
  ) {
    this.sitePropsService = new SitePropsService(client);
  }

  async exec(props: SitecorePageProps): Promise<SitecorePageProps> {
    if (!props?.layoutData?.sitecore?.route) return props;

    const documents = this.factory(props?.layoutData);

    if (documents && documents.length > 0) {
      const batchRequestOptions: BatchRequestsOptions<Variables> = {
        documents,
      };

      /* eslint-disable-next-line no-param-reassign */
      props.siteProps = await this.sitePropsService.fetchSiteProps(batchRequestOptions);
    } else {
      /* eslint-disable-next-line no-param-reassign */
      props.siteProps = {} as SitePropsCollection;
    }

    return props;
  }
}
