export const parentIdQuery = `query GetParentId($itemId: String!){
    parentId:item(path:$itemId, language:"en"){
      parent{
       id
       url{
        path
       }
      }
    }
  }`;