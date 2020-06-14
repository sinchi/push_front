import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Company Redux States
import { ADD_COMPANY, LIST_COMPANIES } from './actionTypes';
import {
  addCompanySuccess,
  addCompanyFailed,
  listCompaniesSuccess,
  listCompaniesFailed,
} from './actions';

//Include Both Helper File with needed methods
import { postCompany, getListCompanies } from './services';

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

export function* watchAddCompany() {
  yield takeEvery(ADD_COMPANY, addCompanyHandler);
}

export function* watchListCompanies() {
  yield takeEvery(LIST_COMPANIES, listCompaniesHandler);
}

function* companiesSaga() {
  yield all([fork(watchAddCompany), fork(watchListCompanies)]);
}

export default companiesSaga;
