import { createContext, ReactNode } from 'react';
import { SitePropsCollection } from './types';

export const SitePropsContext = createContext<SitePropsCollection | undefined>({});

export type SitePropsContextProps = {
  children: ReactNode;
  value?: SitePropsCollection;
};

export const SitePropsContextProvider = ({
  children,
  value,
}: SitePropsContextProps): JSX.Element => (
  <SitePropsContext.Provider value={value}>{children}</SitePropsContext.Provider>
);
