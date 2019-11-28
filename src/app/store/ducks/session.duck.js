import createAction from 'app/utils/createAction';
import produce from 'immer/dist/immer';
import {
  call,
  put,
  takeLatest,
} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
import { push } from 'connected-react-router';
import API from 'app/api';
export const fetchSessionRoutine = createAction('FETCH_SESSION', 'session');
export const fetchAuthRoutine = createAction('FETCH_AUTH', 'session');
export const logoutRoutine = createAction('LOGOUT', 'session');

export const initialState = {
  profile: {},
  isAuth: false,
  isSessionLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
export const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case fetchAuthRoutine.TRIGGER:
        draft.isSessionLoading = true;
        break;
      case fetchAuthRoutine.SUCCESS:
        if (!action.payload.failure) {
          draft.profile = action.payload;
          draft.isAuth = true;
          draft.isSessionLoading = false;
        }
        break;
      case fetchAuthRoutine.FAILURE:
        draft.isSessionLoading = false;
        break;
      case fetchSessionRoutine.SUCCESS:
        draft.profile = action.payload;
        draft.isAuth = true;
        break;
      case logoutRoutine.SUCCESS:
        draft.profile = {};
        draft.isAuth = false;
        break;
      case fetchSessionRoutine.FAILURE:
        draft.profile = {};
        draft.isAuth = false;
        break;
    }
  });

function* fetchAuth({ payload }) {
  const { values, formikActions, intl } = payload;
  try {
    const res = yield call(API.session.fetchAuth, values);
    yield put(push('/'));
    yield put(fetchAuthRoutine.success(res.data));
  } catch {
    formikActions.setSubmitting(false);
    formikActions.setStatus(
      intl.formatMessage({
        id: 'AUTH.VALIDATION.INVALID_LOGIN',
      }),
    );
    yield put(fetchAuthRoutine.failure());
  }
}

function* fetchSession() {
  try {
    const res = yield call(API.session.fetchSession, '/api/auth/session');
    yield put({ type: fetchSessionRoutine.SUCCESS, payload: res.data });
  } catch (err) {
    yield put(fetchSessionRoutine.failure());
  }
}

function* fetchLogout() {
  yield call(API.session.fetchLogout, '/api/auth/logout');
  yield put(logoutRoutine.success());
}

export function* saga() {
  yield takeLatest(fetchSessionRoutine.TRIGGER, fetchSession);
  yield takeLatest(logoutRoutine.TRIGGER, fetchLogout);
  yield takeLatest(fetchAuthRoutine.TRIGGER, fetchAuth);
}
