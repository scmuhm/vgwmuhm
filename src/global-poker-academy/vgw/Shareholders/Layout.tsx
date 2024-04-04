import {
  Field,
  HTMLLink,
  ImageField,
  LayoutServiceData,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Head from 'next/head';
import ShareholdersFooter from 'vgw/Shareholders/components/Footer';
import ShareholdersHeader from 'vgw/Shareholders/components/Header';

interface LayoutProps {
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
}

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

const Layout = ({ layoutData, headLinks }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;
  const fields = route?.fields as RouteFields;
  const isPageEditing = layoutData.sitecore.context.pageEditing;
  const mainClassPageEditing = isPageEditing ? 'editing-mode' : 'prod-mode';

  const robotsContent = [
    { name: 'index', value: !fields.NoIndex?.value },
    { name: 'follow', value: !fields.NoFollow?.value },
    { name: 'archive', value: !fields.NoArchive?.value },
  ]
    .map(({ name, value }) => `${value ? '' : 'no'}${name}`)
    .join(', ');

  return (
    <>
      <Head>
        <title>VGW Shareholders</title>
        <meta property="og:title" content="VGW Shareholders" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="VGW Shareholders" />
        <meta property="og:locale" content="en_US" />
        <meta name="robots" content={robotsContent} />
        <meta name="description" content="VGW Shareholder Updates" />
        <meta property="og:description" content="VGW Shareholder Updates" />
        {fields?.Image && (
          <meta property="og:image" content={fields?.Image?.value?.src?.toString()} />
        )}

        <link
          rel="icon"
          href="data:image/png;base64,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"
          type="image/gif"
        />
        {headLinks.map((headLink) => (
          <link rel={headLink.rel} key={headLink.href} href={headLink.href} />
        ))}
      </Head>

      <div className={`${mainClassPageEditing} page-container`}>
        <ShareholdersHeader />

        <main>
          <div className="main-heading">
            <h1 className="main-heading-text">Shareholder Updates</h1>
          </div>

          <div id="content">{route && <Placeholder name="headless-main" rendering={route} />}</div>
        </main>

        <ShareholdersFooter />
      </div>
    </>
  );
};

export default Layout;
