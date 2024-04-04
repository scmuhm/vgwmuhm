import { useState, useContext, useEffect } from 'react';

import Script from 'next/script';

import { CookieConsentStatus, CookieConsentContext } from '../utils/cookie-consent-context';

type Event = StartTrackingEvent | PageLoadEvent;

interface PageLoadEvent {
  event: 'pageload';
  pageTitle: string;
  pagePath: string;
  originalLocation?: string;
}

interface StartTrackingEvent {
  event: 'gtm.js';

  'gtm.start': number;
}

declare let window: {
  dataLayer: Event[];
  location: {
    pathname: string;
    href: string;
  };
};

function trackEvent(event: Event) {
  if (window.dataLayer === undefined) window.dataLayer = [];

  window.dataLayer.push(event);
}

export default function GoogleTagManager({ id }: { id: string }) {
  const { status } = useContext(CookieConsentContext);

  if (status !== CookieConsentStatus.Accepted) return null;

  return (
    <Script
      onLoad={() => trackEvent({ event: 'gtm.js', 'gtm.start': new Date().getTime() })}
      src={`https://www.googletagmanager.com/gtm.js?id=${id}`}
    />
  );
}

export function usePageView() {
  const { status } = useContext(CookieConsentContext);

  const [hasBeenTracked, setHasBeenTracked] = useState(false);

  useEffect(() => {
    if (!hasBeenTracked && status !== CookieConsentStatus.Rejected) {
      trackEvent({
        event: 'pageload',

        pageTitle: document.title,
        pagePath: location.pathname,
        originalLocation: window.location.href,
      });

      setHasBeenTracked(true);
    }
  }, [status, hasBeenTracked]);
}
