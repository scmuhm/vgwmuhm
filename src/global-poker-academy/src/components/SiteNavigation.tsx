import {
  ComponentParams,
  ComponentRendering,
  GetStaticComponentProps,
  GraphQLRequestClient,
} from '@sitecore-jss/sitecore-jss-nextjs';

import SiteNavigationResponse, {
  NavigationFilter,
  NavigationItem,
} from 'graphql/SiteNavigationResponse';

import { siteNavigationQuery } from 'graphql/SiteNavigationGraphQL';
import { graphQLEndpoint, sitecoreApiKey } from 'temp/config';
import NavigationMenu from './NavigationMenu';

import { JSX } from 'react';

type ComponentProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
} & SiteNavigationResponse;

export const Default = (props: ComponentProps): JSX.Element => {
  const { siteNavigation, params } = props;
  const styles = `${params.GridParameters ?? ''} ${params.Styles ?? ''}`.trimEnd();

  if (!siteNavigation?.children?.results) {
    return <></>;
  }

  // filter out empty nav titles
  let filteredResults = siteNavigation.children.results.filter((item) => item.navigationTitle);

  const targetName = 'Main Navigation';

  filteredResults = filteredResults.filter((item: NavigationItem) => {
    return !item.navigationFilter?.jsonValue?.some(
      (filter: NavigationFilter) => filter.name === targetName
    );
  });

  return <NavigationMenu tabs={filteredResults} customStyles={styles} />;
};

export const getStaticProps: GetStaticComponentProps = async () => {
  const graphQLClient = new GraphQLRequestClient(graphQLEndpoint, { apiKey: sitecoreApiKey });
  const result = await graphQLClient.request<SiteNavigationResponse>(siteNavigationQuery);

  return result;
};
