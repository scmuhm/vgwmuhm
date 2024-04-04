export const breadcrumbQuery = `fragment breadcrumbFields on Item {
  navigationTitle:field(name: "NavigationTitle")
  {
    jsonValue
  }
  navigationFilter:field(name: "NavigationFilter")
  {
    jsonValue
  }
  url {
    path
  }
}

query BreadcrumbsQuery($itemId: String!) {
  breadcrumb: item(path: $itemId, language: "en") {
    ancestors(
      hasLayout: true
    ) {
      ...breadcrumbFields
    }
  }
}`;
