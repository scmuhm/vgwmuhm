export const threeColumnArticlesQuery = `query ArticleListQueryByCategory($pageSize: Int!, $categoryId: String, $hash:String) {
  category:item(path:$categoryId, language:"en"){
    id
    url{
    path}
  
    categoryTitle:field(name:"Title"){value}
    categoryShortTitle:field(name:"ShortTitle"){value}
    secondaryColor:field(name:"SecondaryColor"){value}
    }
  item: search(
    where: {
      AND: [
        {
          name: "_templates",
          value: "0AE7CC451FCB43FE803BAEC6E9C9D062",
          operator: CONTAINS
        }
        {
          name: "_path",
          value: $categoryId,
          operator: CONTAINS
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