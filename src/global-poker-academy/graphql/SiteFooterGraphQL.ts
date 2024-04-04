export const siteFooterQuery = `query FooterQuery{
  siteFooter:item(path:"/sitecore/content/VGW/GlobalPokerAcademy/Settings/Footer Configuration", language:"en"){
    id
    copyrightText: field(name:"Copyright Text")
    {
      jsonValue
    }   
    logo:field(name:"Logo"){
      jsonValue
    }
  }
  footerLinks:item(path:"/sitecore/content/VGW/GlobalPokerAcademy/Settings/Footer Configuration/Footer Links", language:"en")
  {
    children{
      results{
        link: field(name:"Link"){
          jsonValue
        }
        customText:field(name:"Custom Text"){
          value
        }
      }
    }
  }
  socialLinks:item(path:"/sitecore/content/VGW/GlobalPokerAcademy/Settings/Footer Configuration/Social Links", language:"en")
  {
    children{
      results{
        link: field(name:"Link"){
          jsonValue
        }
        hide:field(name :"Hide"){
          value
        }
        icon:field(name:"Icon"){
          jsonValue
        }
        title:field(name:"Title"){
          value
        }
      }
    }
  }
}`;
