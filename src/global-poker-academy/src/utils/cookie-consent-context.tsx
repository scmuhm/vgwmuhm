import { createContext, ReactNode, useState, useEffect } from 'react';

export enum CookieConsentStatus {
  Accepted = 'accepted',

  Rejected = 'rejected',

  Unknown = 'unknown',
}

interface CookieConsentContextProps {
  status: CookieConsentStatus;

  setStatus: (status: CookieConsentStatus) => void;

  popupVisible: boolean;

  setPopupVisible: (popupVisible: boolean) => void;
}

export const CookieConsentContext = createContext({} as CookieConsentContextProps);

export default function CookieConsentProvider({ children }: { children: ReactNode }) {
  const cookieName = 'cookie-consent';

  const [status, setStatus] = useState(getCookieStatus());

  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    setCookieStatus(status);
  }, [status]);

  function getCookieStatus(): CookieConsentStatus {
    if (typeof window !== 'undefined') {
      const status = document.cookie.match(new RegExp(`(^| )${cookieName}=([^;]+)`))?.[2];

      if (Object.values(CookieConsentStatus).includes(status as CookieConsentStatus)) {
        return status as CookieConsentStatus;
      } else {
        return CookieConsentStatus.Accepted;
      }
    } else {
      return CookieConsentStatus.Unknown;
    }
  }
  function setCookieStatus(status: CookieConsentStatus) {
    const expiry = new Date(new Date().setFullYear(new Date().getFullYear() + 10));

    document.cookie = `${cookieName}=${status}; expires=${expiry.toUTCString()}; path=/`;

    setStatus(status);
  }

  return (
    <CookieConsentContext.Provider
      value={{
        status,

        setStatus: setCookieStatus,

        popupVisible,

        setPopupVisible,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}
