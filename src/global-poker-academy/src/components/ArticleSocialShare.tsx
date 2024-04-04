import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ArticlesSocialShareProps {
  rendering: ComponentRendering;
  params: ComponentParams;
  isSocialMedia?: boolean;
}

interface IconLinkProps {
  link: string;
  src: string;
  height: number;
  width: number;
  alt: string;
  click?: (() => void) | undefined;
}

const IconLink = ({ link, src, height, width, alt, click }: IconLinkProps) => (
  <Link href={link} className="social-link" onClick={click}>
    <Image priority src={src} height={height} width={width} alt={alt} className="icon-link" />
  </Link>
);

const shareViaEmail = (pageUrl: string, subject: string, emailBody: string) => {
  const body = `${emailBody}${pageUrl}`;
  return `mailto:?subject=${subject}&body=${body}`;
};

// Function to copy the page URL to the clipboard.
const copyLink: (pageUrl: string) => void = (pageUrl) => {
  const textField = document.createElement('textarea');
  textField.value = pageUrl;
  document.body.appendChild(textField);
  textField.select();

  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Unable to copy to clipboard', err);
  } finally {
    document.body.removeChild(textField);
  }
};

const generateMediaLinks = (
  pageUrl: string,
  subject: string,
  emailBody: string,
  instragramText: string,
  twitterText: string,
  facebookText: string,
  copyText: string,
  emailText: string,
  isSocialMedia = false
): IconLinkProps[] => {
  // Social share URLs for Facebook, Instagram, and Twitter.
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
  const instagramShareUrl = `https://www.instagram.com/sharer.php?u=${pageUrl}`;
  const twitterShareUrl = `https://twitter.com/share?url=${pageUrl}`;

  const socialMediaLinks: IconLinkProps[] = [
    {
      link: twitterShareUrl,
      src: '/twitter-icon.svg',
      height: 20,
      width: 20,
      alt: twitterText,
    },
    {
      link: facebookShareUrl,
      src: '/facebook-icon.svg',
      height: 20,
      width: 20,
      alt: facebookText,
    },
    {
      link: instagramShareUrl,
      src: '/instagram-icon.svg',
      height: 20,
      width: 20,
      alt: instragramText,
    },
  ];

  if (isSocialMedia) {
    return socialMediaLinks;
  }
  const otherLinks: IconLinkProps[] = [
    {
      link: shareViaEmail(pageUrl, subject, emailBody),
      src: '/mail-icon.svg',
      height: 17,
      width: 24,
      alt: emailText,
    },
    {
      link: '#',
      click: () => copyLink(pageUrl),
      src: '/copy-link-icon.svg',
      height: 20,
      width: 20,
      alt: copyText,
    },
  ];

  return [...otherLinks, ...socialMediaLinks];
};

export const Default = (props: ArticlesSocialShareProps): JSX.Element => {
  const { t } = useI18n();

  const [pageUrl, setPageUrl] = useState<string>('');

  useEffect(() => {
    // Set the pageUrl only on the client side
    setPageUrl(window.location.href);
  }, []);

  const mediaLinks = generateMediaLinks(
    pageUrl,
    t('share-email-subject'),
    t('share-email-body'),
    t('share-instagram'),
    t('share-twitter'),
    t('share-facebook'),
    t('share-copy'),
    t('share-email'),
    props.isSocialMedia
  );

  const styles = `${props.params.GridParameters ?? ''} ${props.params.Styles ?? ''}`.trimEnd();
  return (
    <div id={props.rendering.uid} className={`component article-page-heading ${styles}`}>
      <div className="component-content">
        <div className="row">
          <div className="social-media-container">
            {!props.isSocialMedia ? <h3>{t('article-share')}</h3> : null}
            <div className="social-media-links">
              {mediaLinks.map((icon) => (
                <IconLink key={icon.src} {...icon} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
