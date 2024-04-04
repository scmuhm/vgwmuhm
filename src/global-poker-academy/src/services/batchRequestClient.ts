import { GraphQLBatchRequestClient } from 'src/site-props/batchGraphqlClient';
import config from 'temp/config';

export const batchRequestClient = new GraphQLBatchRequestClient(config.graphQLEndpoint, {
  apiKey: config.sitecoreApiKey,
});
