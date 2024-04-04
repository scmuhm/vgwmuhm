import { useContext } from 'react';
import Link from 'next/link';
import { CookieConsentContext, CookieConsentStatus } from '../utils/cookie-consent-context';

// eslint-disable-next-line
declare const OneTrust: any;

export default function CookieConsent({ siteName }: { siteName?: string }) {
  const { setStatus, popupVisible, setPopupVisible } = useContext(CookieConsentContext);

  function accept() {
    if (typeof OneTrust !== 'undefined') {
      OneTrust.AllowAll();
    }
    setStatus(CookieConsentStatus.Accepted);
    setPopupVisible(false);
  }

  function reject() {
    if (typeof OneTrust !== 'undefined') {
      OneTrust.RejectAll();
    }
    setStatus(CookieConsentStatus.Rejected);
    setPopupVisible(false);
  }

  function close() {
    setPopupVisible(false);
  }

  return (
    <div className={`cookie-container ${popupVisible ? 'visible' : ''}`}>
      <div className="cookie-content">
        {siteName === 'ChumbaCasino' ? (
          <div>
            <p>
              By clicking &quot;Accept All&quot;, you agree to the collection of your information
              for analytics and experience personalization purposes; and to the sharing of your
              information with our social media and advertising partners to assist with our
              marketing efforts{` `}
              {
                <>
                  <Link href="/privacy-policy">(Privacy Policy)</Link>,{` `}
                  <Link href="/cookie-notice">(Cookie Notice)</Link>.
                </>
              }
            </p>
            <div className="cookie-buttons">
              <button onClick={() => accept()} className="button primary square medium">
                Accept All
              </button>
              <button onClick={() => reject()} className="button secondary square medium">
                Block All
              </button>
            </div>
          </div>
        ) : (
          <>
            <h3>We use Cookies</h3>
            <p>
              By clicking &quot;Accept All&quot;, you agree to the collection of your information
              for analytics and experience personalization purposes; and to the sharing of your
              information with our social media and advertising partners to assist with our
              marketing efforts.{' '}
              {siteName === 'GlobalPoker' && (
                <a data-testid="cookie-notice-link" href={'/cookie-notice'} target="_blank">
                  Global Poker Cookie Notice
                </a>
              )}
            </p>
            <div className="cookie-buttons">
              <button onClick={() => reject()} className="button secondary square medium">
                Reject All
              </button>
              <button onClick={() => accept()} className="button primary square medium">
                Accept All
              </button>
            </div>
          </>
        )}
      </div>
      {siteName === 'ChumbaCasino' && (
        <button className="close-button" onClick={close}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
            <path
              fill="#fff"
              d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
