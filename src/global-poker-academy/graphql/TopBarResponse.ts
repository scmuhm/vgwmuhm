import { ImageField, LinkField } from "@sitecore-jss/sitecore-jss-nextjs";

export default interface TopBarQueryResponse {
  topBar?: {
    logo: { jsonValue: ImageField };
    link: { jsonValue: LinkField };
  } | null;
}
