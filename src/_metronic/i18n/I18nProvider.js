import React from "react";
import { useSelector } from "react-redux";
import { IntlProvider } from "react-intl";
import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-relativetimeformat/dist/locale-data/en";
import "@formatjs/intl-relativetimeformat/dist/locale-data/de";
import "@formatjs/intl-relativetimeformat/dist/locale-data/es";
import "@formatjs/intl-relativetimeformat/dist/locale-data/fr";
import "@formatjs/intl-relativetimeformat/dist/locale-data/ja";
import "@formatjs/intl-relativetimeformat/dist/locale-data/zh";

import deMessages from "./messages/de";
import enMessages from "./messages/en";
import esMessages from "./messages/es";
import frMessages from "./messages/fr";
import jaMessages from "./messages/ja";
import zhMessages from "./messages/zh";
import ruMessages from "./messages/ru";

const allMessages = {
  ru: ruMessages,
  de: deMessages,
  en: enMessages,
  es: esMessages,
  fr: frMessages,
  ja: jaMessages,
  zh: zhMessages
};

export default function I18nProvider({ children }) {
  const locale = useSelector(({ i18n }) => i18n.lang);
  const messages = allMessages[locale];

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}
