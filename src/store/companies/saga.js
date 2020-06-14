import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Company Redux States
import { ADD_COMPANY, LIST_COMPANIES, GET_COMPANY_BY_ID } from './actionTypes';
import {
  addCompanySuccess,
  addCompanyFailed,
  listCompaniesSuccess,
  listCompaniesFailed,
  getCompanyByIdFailed,
  getCompanyByIdSuccess,
} from './actions';

//Include Both Helper File with needed methods
import { postCompany, getListCompanies, getCompanyById } from './services';

//Import toBase64 helper function
import { getFile } from '../../helpers/toBase64';

function* addCompanyHandler({ payload: { company, history } }) {
  try {
    const { base64StringFile } = yield call(getFile, company.logo);
    const companyWithLogo = Object.assign({}, company, {
      logo: base64StringFile,
    });
    console.log({ companyWithLogo });
    const response = yield call(
      postCompany,
      '/company/create',
      companyWithLogo
    );
    yield put(addCompanySuccess(response.data));

    history.push('/companies');
  } catch (error) {
    console.log({ error });
    yield put(addCompanyFailed(error));
  }
}

function* listCompaniesHandler() {
  try {
    const response = yield call(getListCompanies, '/compagnies');
    yield put(listCompaniesSuccess(response));
  } catch (error) {
    yield put(listCompaniesFailed(error));
  }
}

function* getCompanyByIdHandler({ payload }) {
  try {
    const response = yield call(getCompanyById, '/compagnies', payload);
    yield put(getCompanyByIdSuccess(response));
  } catch (error) {
    yield put(getCompanyByIdFailed(error));
  }
}

export function* watchAddCompany() {
  yield takeEvery(ADD_COMPANY, addCompanyHandler);
}

export function* watchListCompanies() {
  yield takeEvery(LIST_COMPANIES, listCompaniesHandler);
}

export function* watchGetCompanyById() {
  yield takeEvery(GET_COMPANY_BY_ID, getCompanyByIdHandler);
}

function* companiesSaga() {
  yield all([
    fork(watchAddCompany),
    fork(watchListCompanies),
    fork(watchGetCompanyById),
  ]);
}

export default companiesSaga;
