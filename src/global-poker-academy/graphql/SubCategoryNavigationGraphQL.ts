export const subCategoryNavigationQuery = `query SubCategoryNavigation($itemId: String!){
    subCategoryNavigation:item(path:$itemId, language:"en"){
      
      children(includeTemplateIDs:"{33D948F4-7686-4EC0-A3B5-78AD3087DAE7}") {
        results{
          id
          url{
            path
          }
            navigationTitle:field(name: "NavigationTitle")
          {
            jsonValue
          }
          navigationFilter:field(name: "NavigationFilter")
          {
            jsonValue
          }
         
        }
      }
    }
  }`;