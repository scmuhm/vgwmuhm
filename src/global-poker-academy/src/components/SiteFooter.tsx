import {
  ComponentParams,
  ComponentRendering,
  GetStaticComponentProps,
  GraphQLRequestClient,
} from '@sitecore-jss/sitecore-jss-nextjs';

import { graphQLEndpoint, sitecoreApiKey } from 'temp/config';
import { SiteFooterResponse } from 'graphql/SiteFooterResponse';
import { siteFooterQuery } from 'graphql/SiteFooterGraphQL';
import ScrollToTopButton from './shared/ScrollToTop';
import { CookieConsentContext } from 'src/utils/cookie-consent-context';

import Link from 'next/link';
import { useContext } from 'react';

type ComponentProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
} & SiteFooterResponse;

export const Default = (props: ComponentProps): JSX.Element => {
  const { siteFooter, footerLinks, socialLinks, params } = props;
  const { setPopupVisible } = useContext(CookieConsentContext);
  const styles = `${params.GridParameters ?? ''} ${params.Styles ?? ''}`.trimEnd();

  if (!siteFooter) {
    return <></>;
  }

  const showCookiePopup = () => setPopupVisible(true);

  return (
    <div className={`footer_container ${styles}`}>
      <div className={'footer_content_wrapper'}>
        <div className={'footer_navigation_container'}>
          <div className={'footer_navigation'}>
            <img
              className={'footer_logo'}
              src={siteFooter?.logo?.jsonValue?.value?.src ?? ''}
              alt="global poker academy logo"
              width={249}
              height={15}
            />
            <nav>
              <ul className={'footer_links'}>
                {footerLinks?.children?.results?.map((item, index) => (
                  <Link
                    key={index}
                    href={item.link?.jsonValue?.value?.href ?? '#'}
                    className="footer_link"
                    target={item.link?.jsonValue?.value?.target}
                  >
                    {item?.customText?.value || item.link?.jsonValue?.value?.text}
                  </Link>
                ))}
                <span className="footer_link" onClick={showCookiePopup}>
                  Your Privacy Choices
                </span>
              </ul>
            </nav>
          </div>
          <ul className="social_media_links">
            {socialLinks?.children?.results?.map((item, index) => (
              <li key={index}>
                <Link key={index} href={item.link?.jsonValue?.value?.href ?? '#'}>
                  <img src={item.icon?.jsonValue?.value?.src} alt="social media" />{' '}
                </Link>
              </li>
            ))}
          </ul>
          <ScrollToTopButton />
        </div>

        <span className={'footer_footer_text'}>{siteFooter?.copyrightText?.jsonValue.value}</span>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticComponentProps = async () => {
  const graphQLClient = new GraphQLRequestClient(graphQLEndpoint, { apiKey: sitecoreApiKey });
  const result = await graphQLClient.request<SiteFooterResponse>(siteFooterQuery);

  return result;
};
