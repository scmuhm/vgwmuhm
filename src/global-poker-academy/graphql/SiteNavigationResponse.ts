export interface NavigationFilter {
    id: string;
    url: string;
    name: string;
}

export interface NavigationTitle {
    jsonValue?: {
        value: string;
    };
}

export interface NavigationItem {
    id: string;
    url: {
        path: string;
    }
    navigationTitle: NavigationTitle;
    navigationFilter?: {
        jsonValue: NavigationFilter[] | [];
    };
}

interface SiteNavigation {
    children: {
        results: NavigationItem[];
    };
}

export default interface SiteNavigationResponse {
    siteNavigation: SiteNavigation;
}