import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from './actionTypes';
import { loginSuccess, apiError } from './actions';

//Include Both Helper File with needed methods
import { postLogin } from '../../../helpers/fakebackend_helper';

const baseURL = 'http://192.168.43.204';

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(postLogin, `${baseURL}/api/login_check`, {
      username: user.username,
      password: user.password,
    });
    sessionStorage.setItem('authUser', JSON.stringify(response));
    yield put(loginSuccess(response));

    history.push('/dashboard');
  } catch (error) {
    console.log({ error });
    yield put(apiError(error));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    sessionStorage.removeItem('authUser');
    history.push('/login');
  } catch (error) {
    yield put(apiError(error));
  }
}

export function* watchUserLogin() {
  yield takeEvery(LOGIN_USER, loginUser);
}

export function* watchUserLogout() {
  yield takeEvery(LOGOUT_USER, logoutUser);
}

function* authSaga() {
  yield all([fork(watchUserLogin), fork(watchUserLogout)]);
}

export default authSaga;
