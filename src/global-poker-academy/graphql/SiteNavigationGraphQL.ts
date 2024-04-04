export const siteNavigationQuery = `query TopBar{
  siteNavigation:item(path:"/sitecore/content/VGW/GlobalPokerAcademy/Home", language:"en"){
    children{
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
