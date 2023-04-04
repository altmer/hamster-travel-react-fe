import { makeVar } from '@apollo/client';
import moment from 'moment';

const DATE_TIME_LOCALES = {
  en: 'en-gb',
  ru: 'ru',
};

export const getStorageLocale = () => localStorage.getItem('locale');

export const locale = makeVar(getStorageLocale() || 'en');

export const getDateTimeLocale = () => DATE_TIME_LOCALES[locale()];

moment.locale(getDateTimeLocale());

export const setLocale = (newLocale) => {
  localStorage.setItem('locale', newLocale);
  locale(newLocale);
  moment.locale(getDateTimeLocale());
  return newLocale;
};
