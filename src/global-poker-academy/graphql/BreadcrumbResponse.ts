import { NavigationFilter, NavigationTitle } from "./SiteNavigationResponse";

export interface BreadcrumbItem {
    id: string;
    url: {
        path: string;
    }
    navigationTitle: NavigationTitle;
    navigationFilter: {
        jsonValue: NavigationFilter[] | [];
    };
}

interface Breadcrumb {
    ancestors: BreadcrumbItem[];
}

export default interface BreadcrumbResponse {
    breadcrumb: Breadcrumb;
}