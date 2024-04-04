export const articlesByCategoryQuery = `query ArticleListQueryByCategory($pageSize: Int!, $itemId: String!, $categoryId: String!, $hash:String) {
    item: search(
      where: {
        AND: [
          {
            name: "_path",
            value: "{504D55F1-8A10-4D39-A421-20542826F1FF}",
            operator: CONTAINS
          }
          {
            name: "_templates",
            value: "0AE7CC451FCB43FE803BAEC6E9C9D062",
            operator: CONTAINS
          }
          {
            name: "ArticleCategory",
            value: $categoryId,
            operator: CONTAINS
          }
          {
            name: "_path",
            value: $itemId,
            operator: NCONTAINS
          }
        ]
      }
      first: $pageSize
      after: $hash
      orderBy: {
        name: "PublicationDate"
        direction: DESC
      }
    ) {
      pageInfo {
        hasNext
        endCursor
      }
      results {
        id
        name
        title: field(name: "Title") {
          jsonValue
        }
        category: field(name: "ArticleCategory"){
          jsonValue
        }
        date: field(name: "PublicationDate") {
          jsonValue
        }
        tags: field(name: "ArticleTags") {
          jsonValue
        }
        image: field(name: "Image"){
          jsonValue
        }
        summary: field(name: "Summary") {
          jsonValue
        }
        url {
          path
        }
      }
    }
  }`;