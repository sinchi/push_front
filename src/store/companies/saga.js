import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Company Redux States
import {
  ADD_COMPANY,
  LIST_COMPANIES,
  GET_COMPANY_BY_ID,
  EDIT_COMPANY,
  DELETE_COMPANY,
} from './actionTypes';
import {
  addCompanySuccess,
  addCompanyFailed,
  listCompaniesSuccess,
  listCompaniesFailed,
  getCompanyByIdFailed,
  getCompanyByIdSuccess,
  editCompanySuccess,
  editCompanyFailed,
  deleteCompanySuccess,
  deleteCompanyFailed,
} from './actions';

//Include Both Helper File with needed methods
import {
  postCompany,
  getListCompanies,
  getCompanyById,
  deleteCompany,
} from './services';

//Import toBase64 helper function
// import { getFile } from '../../helpers/toBase64';

function* addCompanyHandler({ payload: { company, history } }) {
  try {
    /* const { base64StringFile } = yield call(getFile, company.logo);
    const companyWithLogo = Object.assign({}, company, {
      logo: base64StringFile,
    });
     */
    const response = yield call(postCompany, '/company/create', company);
    yield put(addCompanySuccess(response.data));

    history.push('/companies');
  } catch (error) {
    console.log({ error });
    yield put(addCompanyFailed(error));
  }
}

function* editCompanyHandler({ payload: { company, history, id } }) {
  try {
    /*  const { base64StringFile } = yield call(getFile, company.logo);
    const companyWithLogo = Object.assign({}, company, {
      logo: base64StringFile,
    });
    console.log({ companyWithLogo }); */
    const response = yield call(postCompany, `/company/update/${id}`, company);
    yield put(editCompanySuccess(response.data));

    history.push(`/companies/${id}`);
  } catch (error) {
    console.log({ error });
    yield put(editCompanyFailed(error));
  }
}

function* deleteCompanyHandler({ payload: { history, id } }) {
  try {
    const response = yield call(deleteCompany, `/company/delete/${id}`);
    yield put(deleteCompanySuccess(response.data));

    history.push(`/companies`);
  } catch (error) {
    console.log({ error });
    yield put(deleteCompanyFailed(error));
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

export function* watchEditCompany() {
  yield takeEvery(EDIT_COMPANY, editCompanyHandler);
}

export function* watchDeleteCompany() {
  yield takeEvery(DELETE_COMPANY, deleteCompanyHandler);
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
    fork(watchEditCompany),
    fork(watchDeleteCompany),
    fork(watchListCompanies),
    fork(watchGetCompanyById),
  ]);
}

export default companiesSaga;
