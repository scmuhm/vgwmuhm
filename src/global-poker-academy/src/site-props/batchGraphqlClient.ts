import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss-nextjs';
import { GraphQLRequestClientConfig } from '@sitecore-jss/sitecore-jss';
import { GraphQLClient as Client } from 'graphql-request';

export class GraphQLBatchRequestClient extends GraphQLRequestClient {
  batchClient: Client;

  constructor(endpoint: string, clientConfig?: GraphQLRequestClientConfig) {
    super(endpoint, clientConfig);
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    this.batchClient = (this as any).client as Client;
  }

  async batchRequest<T>(...args: Parameters<Client['batchRequests']>): Promise<T> {
    return this.batchClient.batchRequests(...args) as T;
  }
}
