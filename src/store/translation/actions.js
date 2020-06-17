import { SET_LANGUAGE } from './actionTypes';

import i18n from '../../i18n';

export const setLanguage = (lang) => {
  i18n.changeLanguage(lang);
  return {
    type: SET_LANGUAGE,
    payload: lang,
  };
};
