import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Company Redux States
import {
  ADD_APPLICATION,
  LIST_APPLICATIONS,
  GET_APPLICATION_BY_ID,
  EDIT_APPLICATION,
  DELETE_APPLICATION,
} from './actionTypes';
import {
  addApplicationSuccess,
  addApplicationFailed,
  listApplicationsSuccess,
  listApplicationsFailed,
  getApplicationByIdFailed,
  getApplicationByIdSuccess,
  editApplicationSuccess,
  editApplicationFailed,
  deleteApplicationSuccess,
  deleteApplicationFailed,
} from './actions';

//Include Both Helper File with needed methods
import {
  postApplication,
  getListApplications,
  getApplicationById,
  deleteApplication,
} from './services';

//Import toBase64 helper function
// import { getFile } from '../../helpers/toBase64';

function* addApplicationHandler({ payload: { application, history } }) {
  try {
    /* const { base64StringFile } = yield call(getFile, company.logo);
    const companyWithLogo = Object.assign({}, company, {
      logo: base64StringFile,
    });
     */
    const response = yield call(
      postApplication,
      '/application/create',
      application
    );
    yield put(addApplicationSuccess(response.data));

    history.push('/companies');
  } catch (error) {
    console.log({ error });
    yield put(addApplicationFailed(error));
  }
}

function* editApplicationHandler({ payload: { application, history, id } }) {
  try {
    /*  const { base64StringFile } = yield call(getFile, company.logo);
    const companyWithLogo = Object.assign({}, company, {
      logo: base64StringFile,
    });
    console.log({ companyWithLogo }); */
    const response = yield call(
      postApplication,
      `/application/update/${id}`,
      application
    );
    yield put(editApplicationSuccess(response.data));

    history.push(`/applications/${id}`);
  } catch (error) {
    console.log({ error });
    yield put(editApplicationFailed(error));
  }
}

function* deleteApplicationHandler({ payload: { history, id } }) {
  try {
    const response = yield call(deleteApplication, `/application/delete/${id}`);
    yield put(deleteApplicationSuccess(response.data));

    history.push(`/applications`);
  } catch (error) {
    console.log({ error });
    yield put(deleteApplicationFailed(error));
  }
}

function* listApplicationsHandler() {
  try {
    const response = yield call(getListApplications, '/applications');
    yield put(listApplicationsSuccess(response));
  } catch (error) {
    yield put(listApplicationsFailed(error));
  }
}

function* getApplicationByIdHandler({ payload }) {
  try {
    const response = yield call(getApplicationById, '/applications', payload);
    yield put(getApplicationByIdSuccess(response));
  } catch (error) {
    yield put(getApplicationByIdFailed(error));
  }
}

export function* watchAddApplication() {
  yield takeEvery(ADD_APPLICATION, addApplicationHandler);
}

export function* watchEditApplication() {
  yield takeEvery(EDIT_APPLICATION, editApplicationHandler);
}

export function* watchDeleteApplication() {
  yield takeEvery(DELETE_APPLICATION, deleteApplicationHandler);
}

export function* watchListApplications() {
  yield takeEvery(LIST_APPLICATIONS, listApplicationsHandler);
}

export function* watchGetApplicationById() {
  yield takeEvery(GET_APPLICATION_BY_ID, getApplicationByIdHandler);
}

function* companiesSaga() {
  yield all([
    fork(watchAddApplication),
    fork(watchEditApplication),
    fork(watchDeleteApplication),
    fork(watchListApplications),
    fork(watchGetApplicationById),
  ]);
}

export default companiesSaga;
