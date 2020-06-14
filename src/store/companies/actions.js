import {
  ADD_COMPANY,
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_FAILED,
  LIST_COMPANIES,
  LIST_COMPANIES_SUCCESS,
  LIST_COMPANIES_FAILED,
  GET_COMPANY_BY_ID,
  GET_COMPANY_BY_ID_SUCCESS,
  GET_COMPANY_BY_ID_FAILED,
} from './actionTypes';

export const addCompany = (company, history) => ({
  type: ADD_COMPANY,
  payload: {
    company,
    history,
  },
});

export const addCompanySuccess = (company) => ({
  type: ADD_COMPANY_SUCCESS,
  payload: company,
});

export const addCompanyFailed = (error) => ({
  type: ADD_COMPANY_FAILED,
  payload: error,
});

export const listCompanies = () => ({
  type: LIST_COMPANIES,
});

export const listCompaniesSuccess = (companies) => ({
  type: LIST_COMPANIES_SUCCESS,
  payload: companies,
});

export const listCompaniesFailed = (error) => ({
  type: LIST_COMPANIES_FAILED,
  payload: error,
});

export const getCompanyById = (id) => ({
  type: GET_COMPANY_BY_ID,
  payload: id,
});

export const getCompanyByIdSuccess = (company) => ({
  type: GET_COMPANY_BY_ID_SUCCESS,
  payload: company,
});

export const getCompanyByIdFailed = (error) => ({
  type: GET_COMPANY_BY_ID_FAILED,
  payload: error,
});
