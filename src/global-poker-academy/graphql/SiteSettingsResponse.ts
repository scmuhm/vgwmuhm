export type SiteSettings = {
  googleTagManagerId?: {
    value: string;
  };
};

export interface SiteSettingsResponse {
  siteSettings?: SiteSettings;
}
