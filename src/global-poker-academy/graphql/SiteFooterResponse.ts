import { ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

export interface LinkItem {
  link: {
    jsonValue: LinkField;
  };
  customText?: {
    value: string;
  };
  hide?: {
    value: boolean;
  };
}

export interface SocialLink {
  link: {
    jsonValue: LinkField;
  };
  hide: {
    value: string;
  };
  icon: {
    jsonValue: ImageField;
  };
  title: {
    value: string;
  };
}

export interface FooterLinks {
  children: {
    results: LinkItem[];
  };
}

export interface SocialLinks {
  children: {
    results: SocialLink[];
  };
}

export interface SiteFooterResponse {
  siteFooter: {
    id: string;
    copyrightText: {
      jsonValue: {
        value: string;
      };
    };
    logo: {
      jsonValue: ImageField;
    };
  };
  footerLinks: FooterLinks;
  socialLinks: SocialLinks;
}
