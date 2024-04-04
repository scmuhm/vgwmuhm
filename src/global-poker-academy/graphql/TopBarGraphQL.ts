export const topBarQuery = `query TopBar{
  topBar: item(path:"/sitecore/content/VGW/GlobalPokerAcademy/Settings/Top Bar Configuration", language:"en"){
    id
    logo: field(name:"Logo"){
      ... on ImageField
      {
        jsonValue
      }
    }
    link: field(name:"Link"){
      ... on LinkField
      {
        jsonValue
      }
    }
  }
}`;
