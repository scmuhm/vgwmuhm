import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { NavigationItem } from 'graphql/SiteNavigationResponse';
import Link from 'next/link';
import { MouseEventHandler, useState } from 'react';
import Button from './shared/Button';

interface VanillaNavigationMenuProps {
  tabs: NavigationItem[];
  customStyles?: string;
  isSubNavigation?: boolean;
}

interface TabProps {
  id: string;
  navLinkTitle?: string;
  handleClick?: MouseEventHandler<HTMLAnchorElement>;
  url?: string;
  isActive?: boolean;
}

const DEFAULT_CATEGORY = 'Categories';
const getCategoryNameFromPath = (inputUrl: string) => inputUrl.split('?')[0].replace(/[-_]/g, ' ');

const Tab = ({ id, navLinkTitle = 'ALL', handleClick, url = '#', isActive = false }: TabProps) => {
  return (
    <li key={id} className={`nav-item ${isActive ? 'active' : ''}`}>
      <Link href={url} onClick={handleClick} className="nav-link">
        {navLinkTitle}
      </Link>
    </li>
  );
};

const ArrowIcon = ({ up = false }) => (
  <svg
    className={`${up ? ` up` : ''}`}
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
  >
    <path
      d="M6.08019 8.82616L1.27376 4.01973C1.04195 3.78792 1.04195 3.4121 1.27376 3.18031L1.83435 2.61972C2.06577 2.3883 2.44083 2.38786 2.67278 2.61873L6.49992 6.42791L10.327 2.6187C10.559 2.38783 10.934 2.38828 11.1655 2.61969L11.726 3.18029C11.9579 3.4121 11.9579 3.78792 11.726 4.01971L6.91961 8.82614C6.68783 9.05795 6.312 9.05795 6.08019 8.82616Z"
      fill="#1A1A1A"
    />
  </svg>
);

const NavigationMenu = ({ tabs, isSubNavigation = false }: VanillaNavigationMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const context = useSitecoreContext();
  const routeName = context?.sitecoreContext?.route?.name;
  const itemPath = String(context.sitecoreContext?.itemPath);
  //On subcategory page we have to retrieve active category title for SiteNavigation from url, because we don`t have parent title(navigationTitle point to the subcategory).
  const [, category, subcategory] = itemPath.split('/');
  const hasTabs = tabs.length > 0;

  const handleClick = () => {
    setIsOpen(false);
  };

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const currentRoute = isSubNavigation
    ? routeName
    : getCategoryNameFromPath(category) || DEFAULT_CATEGORY;

  const subCategoryAllTab =
    isSubNavigation && hasTabs ? (
      <Tab id="all" handleClick={handleClick} url={category} isActive={!subcategory} />
    ) : null;

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="menu-toggler-wrapper">
          {hasTabs ? (
            <Button buttonType="button" onClick={handleToggleMenu}>
              <span>{isSubNavigation && !subcategory ? 'ALL' : currentRoute}</span>
              <ArrowIcon up={isOpen} />
            </Button>
          ) : null}
        </div>
        <ul className={`nav-items${isOpen ? ` show` : ''}`}>
          {subCategoryAllTab}
          {hasTabs
            ? tabs.map(({ id, navigationTitle, url }) => {
                const navLinkTitle = navigationTitle?.jsonValue?.value ?? '';
                return (
                  <Tab
                    id={id}
                    key={id}
                    navLinkTitle={navLinkTitle}
                    handleClick={handleClick}
                    url={url?.path ?? '#'}
                    isActive={currentRoute === navLinkTitle.toLocaleLowerCase()}
                  />
                );
              })
            : null}
        </ul>
      </div>
    </div>
  );
};

export default NavigationMenu;
