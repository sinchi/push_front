// @flow
import {
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_FAILED,
  ADD_COMPANY,
  LIST_COMPANIES,
  LIST_COMPANIES_SUCCESS,
  LIST_COMPANIES_FAILED,
} from './actionTypes';

const INIT_STATE = {
  error: '',
  loading: false,
};

const Company = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_COMPANY:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ADD_COMPANY_SUCCESS:
      state = {
        ...state,
        company: action.payload,
        loading: false,
      };
      break;
    case ADD_COMPANY_FAILED:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    case LIST_COMPANIES:
      state = {
        ...state,
        loading: true,
      };
      break;
    case LIST_COMPANIES_SUCCESS:
      state = {
        ...state,
        loading: false,
        companies: action.payload,
      };
      break;
    case LIST_COMPANIES_FAILED:
      state = {
        ...state,
        loading: false,
        error: action.payload,
      };
      break;
    default:
      state = { ...state };
      break;
  }

  return state;
};

export default Company;
