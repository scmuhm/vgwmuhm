import { GraphQLBatchRequestClient } from '../batchGraphqlClient';
import { SitePropsCollection } from '../types';

interface DataResponse {
  data?: Record<string, unknown>;
}

/**
 * Site Props Service with dependency on a GraphQL Batch Request Client
 *
 * When fetching, the RAW response from the batch client will be:
 * [
 *  { data: { response1: { // data }}},
 *  { data: { response2: { // data }}}
 * ]
 *
 * After fetching, the responses are grouped by the inner response keys, first key after data.
 * The above response will be grouped into the following object:
 * {
 *   response1: { // data },
 *   response2: { // data }
 * }
 *
 * Note: It is extremely important that for each query, including nested queries, that you use unique aliases
 * for each query so that the keys are not combined after processing.
 */
export class SitePropsService {
  /* eslint-disable-next-line no-useless-constructor */
  constructor(protected batchClient: GraphQLBatchRequestClient) {}

  async fetchSiteProps<T extends SitePropsCollection = SitePropsCollection>(
    ...args: Parameters<GraphQLBatchRequestClient['batchRequest']>
  ): Promise<T> {
    // const responses = await this.client.batchRequest<Array<DataResponse>>(
    //   ...args
    // );
    //TODO:

    const responses = await this.batchClient.batchRequest<Array<DataResponse>>(...args);
    const props = responses.reduce((SiteProps: T, response: DataResponse) => {
      return {
        ...SiteProps,
        ...response?.data,
      };
    }, {} as T);

    return props;
  }
}
