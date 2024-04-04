import { BatchRequestDocument, Variables } from 'graphql-request';

import { LayoutServiceData } from '@sitecore-jss/sitecore-jss-nextjs';
import { SitePropsPlugin } from 'src/site-props';
import { batchRequestClient } from 'src/services/batchRequestClient';

export type DocumentFactory = (layoutData: LayoutServiceData) => BatchRequestDocument<Variables>[];

const factory: DocumentFactory = () => {
  // const topBar: BatchRequestDocument = {
  //   document: topBarQuery,
  //   variables: {},
  // };

  return [];
};

const pluginOrder = 3;

export const sitePropsPlugin = new SitePropsPlugin(pluginOrder, batchRequestClient, factory);
