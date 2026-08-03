"use client";

import React, { createContext, useContext } from "react";
import type { Locale } from "@/lib/i18n";
import { defaultLocale } from "@/lib/i18n";

interface LanguageContextValue {
  locale: Locale;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: defaultLocale,
});

export function LanguageProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <LanguageContext.Provider value={{ locale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLocale(): Locale {
  return useContext(LanguageContext).locale;
}
