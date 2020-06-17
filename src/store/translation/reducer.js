// @flow
import { SET_LANGUAGE } from './actionTypes';

const INIT_STATE = {
  language: 'fr',
};

const Language = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      state = {
        ...state,
        language: action.payload,
      };
      break;
    default:
      state = { ...state };
      break;
  }

  return state;
};

export default Language;
