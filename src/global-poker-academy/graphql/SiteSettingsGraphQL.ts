export const siteSettingsQuery = `query SiteSettings($sitePath: String!) {
  siteSettings: item(path: $sitePath, language: "en") {
    googleTagManagerId: field(name: "Google Tag Manager ID") {
      value
    }
  }
}`;
