# Page Props Feature

The Page Props Feature provides the following:

- ability to fetch additional `global` or  props using the Sitecore JSS Page Props Factory pattern. This pattern avoids per-component based GraphQL queries for settings or other `global` props that can be used throughout all components.
- ability to rewrite props by converting to JSON, using regex, and then parsing back to an object

## Table of contents

- [Site Props](#site-props)
  - [When to use Site Props?](#when-to-use-global-props)
    - [Common Use Cases](#common-use-cases)
  - [Setup Instructions for Site Props](#setup-instructions-for-site-props)
    - [Extend SitePropsCollection with custom data](#extend-sitepropscollection-with-custom-data)
    - [Update SitecorePageProps type](#update-sitecorepageprops-type)

## Site Props

### When to use Site Props?

> The main focus for this feature is to avoid unnecessary GraphQL requests to the Experience Edge APIs as it can cause a `Cache Stampede` after a publish has occurred. Other considerations are more performant build times and less complexity per component.

Site Props is `best` used when it is required to fetch data that is not included with the Layout Service, such as settings, but is needed across components and `does not change per page`. The Site Props will batch indepdent GraphQL requests, with variables, and submit the batch to the Experience Edge APIs - this triggers only a single uncached hit that goes against the request per second limit of the API's. After the initial request is fulfilled, subsequent requests will always be cached until the next publish. This improves build time and avoids multiple requests to Experience Edge APIs.

The primary usage for this feature is to fetch non-page specific requests to retrieve all data needed to build the page so that each individual react component does not need to request its own data or duplicate queries. However, even page specific data can make use of this feature.

When to use Site Props vs Component `getStaticProps`:

1. Data is required across components or considered "site level", such as settings
2. The same or similar queries are executed across multiple components, that are on all pages (such as header, footer, alerts, etc).
    1. In this case, its more important to focus on reducing requests with batching

> The goal is to reduce the requests needed to build a page to avoid a `Cache Stampede` on the Experience Edge APIs. When using separate requests per component, each request will count against the request per second limit, even if they are the same request due to the `Cache Stampede` effect after publishing.

> For page specific requests but still might be considered `global`, the cost of each individual request needs to be weighed against combining the requests vs per component requests, whichever reduces the number of total uncached requests to the Experience Edge APIs should be chosen. E.g. 3 components make a request to perform the same query (or similar), you would get 3 uncached requests after a publish. If a single query was used on Site Props, you would only have 1 query that was executed per page, even though the Site Props batch request could not be cached across all pages.

#### Common Use Cases

The following are common use cases where you should use Site Props:

- Settings
- Navigation elements, such as a static Menu
- Taxonomy

### Setup Instructions for Site Props

#### Extend SitePropsCollection with custom data

Extending `SitePropsCollection` allows for strongly typed objects when working with the `hooks` or `hoc`.


Recommended pattern to extend `SitePropsCollection`:
```typescript
const { SitePropsCollection } from '...';
const { AlertsQueryResponse } from 'path to type';

export interface SiteGlobalPropsCollection extends SitePropsCollection, AlertsQueryResponse { }
```

#### Update SitecorePageProps type

Within the directory `src/lib`, update the `page-props.ts` class to include the `siteProps` property:

Update the `SitecorePageProps` to include the siteProps:

```typescript
/**
 * Sitecore page props
 */
export type SitecorePageProps = {
  layoutData: LayoutServiceData;
  componentProps: ComponentPropsCollection;
  siteProps?: SiteGlobalPropsCollection;
  dictionary: DictionaryPhrases;
  locale: string;
  notFound: boolean;
};
```

```typescript
// truncated for brevity
import { SitePropsContextProvider } from '@...';

const SitecorePage = ({ 
  notFound, 
  componentProps, 
  layoutData,
  siteProps
}: SitecorePageProps): JSX.Element => {
  return (
    <ComponentPropsContext value={componentProps}>
      <SitePropsContextProvider value={siteProps}>
        <SitecoreContext componentFactory={componentFactory} layoutData={layoutData}>
          <Layout layoutData={layoutData} />
        </SitecoreContext>
      </SitePropsContextProvider>
    </ComponentPropsContext>
  );
};
```

