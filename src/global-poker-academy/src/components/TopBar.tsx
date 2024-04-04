import {
  ComponentParams,
  ComponentRendering,
  GetStaticComponentProps,
  GraphQLRequestClient,
} from '@sitecore-jss/sitecore-jss-nextjs';

import TopBarResponse from 'graphql/TopBarResponse';
import { topBarQuery } from 'graphql/TopBarGraphQL';
import { graphQLEndpoint, sitecoreApiKey } from 'temp/config';

import Link from 'next/link';

type ComponentProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
} & TopBarResponse;

export const Default = (props: ComponentProps): JSX.Element => {
  const { topBar, params } = props;
  const styles = `${params.GridParameters ?? ''} ${params.Styles ?? ''}`.trimEnd();

  if (!topBar) {
    // Return some loading state or a message indicating data is not available
    return <></>;
  }

  return (
    <div className={`top-bar ${styles}`}>
      <div className="component-content">
        <Link href={'/'} className="logo">
          <img src={topBar?.logo.jsonValue?.value?.src} alt="logo" />
        </Link>
        <Link href={topBar?.link?.jsonValue?.value?.href || '#'} className="play-btn">
          {topBar?.link?.jsonValue?.value?.text}
        </Link>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticComponentProps = async () => {
  const graphQLClient = new GraphQLRequestClient(graphQLEndpoint, { apiKey: sitecoreApiKey });
  const result = await graphQLClient.request<TopBarResponse>(topBarQuery);

  return result;
};
