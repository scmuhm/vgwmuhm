import {
  ComponentParams,
  ComponentRendering,
  GetStaticComponentProps,
  GraphQLRequestClient,
  useComponentProps,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { parentIdQuery } from 'graphql/GetParentIdGraphQL';
import GetParentIdResponse from 'graphql/GetParentIdResponse';
import { subCategoryNavigationQuery } from 'graphql/SubCategoryNavigationGraphQL';
import SubCategoryNavigationResponse from 'graphql/SubCategoryNavigationResponse';
import { JSX } from 'react';
import config from 'temp/config';
import NavigationMenu from './NavigationMenu';

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

const SUBCATEGORY_TEMPLATENAME = 'Sub Category Page';

export const getStaticProps: GetStaticComponentProps = async (_rendering_, layoutData) => {
  const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
    apiKey: config.sitecoreApiKey,
  });

  const templateName = layoutData.sitecore.route?.templateName;
  let itemId = layoutData.sitecore.route?.itemId;

  if (templateName == SUBCATEGORY_TEMPLATENAME) {
    const result = await graphQLClient.request<GetParentIdResponse>(parentIdQuery, {
      itemId: itemId,
    });

    if (result && result.parentId) {
      itemId = result.parentId.parent.id;
    }
  }

  const result = await graphQLClient.request<SubCategoryNavigationResponse>(
    subCategoryNavigationQuery,
    {
      itemId: itemId,
    }
  );

  return result;
};

export const Default = ({ rendering, params }: ComponentProps): JSX.Element => {
  const data = useComponentProps<SubCategoryNavigationResponse>(rendering.uid);
  const styles = `${params.GridParameters ?? ''} ${params.Styles ?? ''}`.trimEnd();
  if (!data?.subCategoryNavigation?.children?.results) {
    // Return some loading state or a message indicating data is not available
    return <></>;
  }

  if (data?.subCategoryNavigation?.children?.results.length === 1) {
    // if the length is 1, it only contains the "ALL" option that is added manually, it should not be rendered
    return <></>;
  }

  // filter out empty nav titles
  const filteredResults = data.subCategoryNavigation.children.results.filter(
    (item) => item.navigationTitle
  );

  return filteredResults.length ? (
    <NavigationMenu tabs={filteredResults} customStyles={styles} isSubNavigation />
  ) : (
    <></>
  );
};
