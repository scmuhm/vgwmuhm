import { NavigationItem } from "./SiteNavigationResponse";

interface SubCategoryNavigation {
    children: {
        results: NavigationItem[];
    };
}

export default interface SubCategoryNavigationResponse {
    subCategoryNavigation: SubCategoryNavigation;
}