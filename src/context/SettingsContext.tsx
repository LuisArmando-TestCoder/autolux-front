'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { SettingsMetadata } from '../types/cms';

interface SettingsContextType {
  settings: SettingsMetadata | null;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: null,
});

export const useSettings = () => useContext(SettingsContext);

interface SettingsProviderProps {
  children: ReactNode;
  settings: SettingsMetadata;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children, settings }) => {
  return (
    <SettingsContext.Provider value={{ settings }}>
      {children}
    </SettingsContext.Provider>
  );
};
