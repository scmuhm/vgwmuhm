import React from 'react';
import {
  ComponentParams,
  GetStaticComponentProps,
  GraphQLRequestClient,
  RouteData,
  SitecoreContextValue,
  TextField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import { NavigationFilter, NavigationItem } from 'graphql/SiteNavigationResponse';
import BreadcrumbResponse from 'graphql/BreadcrumbResponse';
import { breadcrumbQuery } from 'graphql/BreadcrumbGraphQL';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Title: TextField;
  NavigationTitle: TextField;
}

interface Breadcrumb {
  title?: string;
  url: string;
}

interface BreadcrumbContextProps extends SitecoreContextValue {
  route: RouteData & {
    fields: Fields;
  };
}

export interface BreadcrumbsProps extends Pick<ComponentProps, 'rendering'> {
  breadcrumbs?: Breadcrumb[];
  params: ComponentParams;
}

export const getStaticProps: GetStaticComponentProps = async (_rendering, layoutData) => {
  const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
    apiKey: config.sitecoreApiKey,
  });
  const result = await graphQLClient.request<BreadcrumbResponse>(breadcrumbQuery, {
    itemId: layoutData?.sitecore?.route?.itemId,
  });

  if (result?.breadcrumb?.ancestors) {
    const targetName = 'Breadcrumb Navigation';

    let filteredResults = result?.breadcrumb.ancestors.filter(
      (bc) => bc.navigationTitle?.jsonValue?.value
    );
    filteredResults = filteredResults?.filter((item: NavigationItem) => {
      return !item.navigationFilter?.jsonValue.some(
        (filter: NavigationFilter) => filter.name === targetName
      );
    });

    return {
      breadcrumbs: filteredResults.reverse().map(
        (bc): Breadcrumb => ({
          title: bc.navigationTitle?.jsonValue?.value,
          url: bc.url.path,
        })
      ),
    };
  }

  return {
    breadcrumbs: [],
  };
};

export const Default = (props: BreadcrumbsProps): JSX.Element => {
  const styles = `${props.params.GridParameters ?? ''} ${props.params.Styles ?? ''}`.trimEnd();
  const context = useSitecoreContext().sitecoreContext as BreadcrumbContextProps;

  return (
    <div className={`component breadcrumb ${styles}`}>
      <div className="component-content">
        <ul>
          {props.breadcrumbs?.map((item, index) => (
            <li key={index}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
          {props.params.ShowContextItem === '1' && (
            <li key="context">
              <a>
                {context.route.fields.NavigationTitle?.value || context.route.fields.Title?.value}
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
