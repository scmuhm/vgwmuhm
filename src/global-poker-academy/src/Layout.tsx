import {
  Field,
  GraphQLRequestClient,
  HTMLLink,
  ImageField,
  LayoutServiceData,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { getPublicUrl } from '@sitecore-jss/sitecore-jss-nextjs/utils';

import CookieConsentProvider from './utils/cookie-consent-context';
import CookieConsent from 'components/CookieConsentBanner';
import GoogleTagManager, { usePageView } from 'components/GoogleTagManager';
import { graphQLEndpoint, sitecoreApiKey } from 'temp/config';

import ShareholdersLayout from '../vgw/Shareholders/Layout';

import Head from 'next/head';
import { siteSettingsQuery } from 'graphql/SiteSettingsGraphQL';
import { SiteSettingsResponse, SiteSettings } from 'graphql/SiteSettingsResponse';
import { useEffect, useState } from 'react';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = getPublicUrl();

interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
  MetaTitle?: Field;
  MetaDescription?: Field;
  NoIndex?: Field<boolean>;
  NoFollow?: Field<boolean>;
  NoArchive?: Field<boolean>;
  Image?: ImageField;
}

type LayoutProps = {
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
  children?: JSX.Element;
};

const Layout = ({ layoutData, headLinks, children }: LayoutProps): JSX.Element => {
  const { route, context } = layoutData.sitecore;
  const fields = route?.fields as RouteFields;
  const mainClassPageEditing = context.pageEditing ? 'editing-mode' : 'prod-mode';
  const siteName = context.site?.name;

  const [siteSettings, setSiteSettings] = useState<SiteSettings>({});

  const GTM_ID = siteSettings?.googleTagManagerId?.value;

  const robotsContent = [
    { name: 'index', value: !fields.NoIndex?.value },
    { name: 'follow', value: !fields.NoFollow?.value },
    { name: 'archive', value: !fields.NoArchive?.value },
  ]
    .map(({ name, value }) => `${value ? '' : 'no'}${name}`)
    .join(', ');

  const fetchSiteSettings = async (siteNameValue: string) => {
    const graphQLClient = new GraphQLRequestClient(graphQLEndpoint, { apiKey: sitecoreApiKey });
    try {
      const response = await graphQLClient.request<SiteSettingsResponse>(siteSettingsQuery, {
        sitePath: `/sitecore/content/VGW/${siteNameValue}`,
      });
      if (response.siteSettings) {
        setSiteSettings(response.siteSettings);
      }
    } catch (error) {
      console.warn('Error fetching site settings:', error);
    }
  };

  useEffect(() => {
    if (siteName) {
      fetchSiteSettings(siteName);
    }
  }, [siteName]);

  usePageView();

  if (siteName === 'Shareholders') {
    return <ShareholdersLayout {...{ layoutData, headLinks }} />;
  }

  return (
    <>
      <Head>
        <title>
          {fields?.MetaTitle?.value?.toString() || fields?.Title?.value?.toString() || 'Page'}
        </title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Global Poker Academy" />
        <meta property="og:locale" content="en_US" />
        <meta
          property="og:title"
          content={
            fields?.MetaTitle?.value?.toString() || fields?.Title?.value?.toString() || 'Page'
          }
        />
        <meta name="robots" content={robotsContent} />
        <meta name="description" content={fields?.MetaDescription?.value?.toString()} />
        <meta property="og:description" content={fields?.MetaDescription?.value?.toString()} />
        {fields?.Image && (
          <meta property="og:image" content={fields?.Image?.value?.src?.toString()} />
        )}

        <link rel="icon" href={`${publicUrl}/favicon.ico`} />

        {headLinks.map((headLink) => (
          <link rel={headLink.rel} key={headLink.href} href={headLink.href} />
        ))}
      </Head>

      <CookieConsentProvider>
        <div className={`${mainClassPageEditing} page-container`}>
          {GTM_ID && <GoogleTagManager id={GTM_ID} />}
          <CookieConsent siteName={siteName} />
          <header>
            <div id="header">
              {route && <Placeholder name="headless-header" rendering={route} />}
            </div>
          </header>
          <main>
            <div id="content">
              {children
                ? children
                : route && <Placeholder name="headless-main" rendering={route} />}
            </div>
          </main>
          <footer>
            <div id="footer">
              {route && <Placeholder name="headless-footer" rendering={route} />}
            </div>
          </footer>
        </div>
      </CookieConsentProvider>
    </>
  );
};

export default Layout;
