import createAction from 'app/utils/createAction';
import produce from 'immer/dist/immer';
import {
  call,
  put,
  takeLatest,
} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
import { push } from 'connected-react-router';
import API from 'app/api';
import tryCatchWrapper from 'app/utils/tryCatchWrapper';
export const fetchSessionRoutine = createAction('FETCH_SESSION', 'session');
export const fetchAuthRoutine = createAction('FETCH_AUTH', 'session');
export const logoutRoutine = createAction('LOGOUT', 'session');

export const initialState = {
  profile: {},
  auth: false,
  isSessionLoading: false,
  error: {},
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
          draft.auth = true;
          draft.isSessionLoading = false;
        }
        break;
      case fetchAuthRoutine.FAILURE:
        draft.isSessionLoading = false;
        draft.error = action.payload;
        break;
      case fetchSessionRoutine.SUCCESS:
        draft.profile = action.payload;
        draft.auth = true;
        break;
      case logoutRoutine.SUCCESS:
        draft.profile = {};
        draft.auth = false;
        break;
      case fetchSessionRoutine.FAILURE:
        draft.profile = {};
        draft.auth = false;
        break;
    }
  });

function* fetchAuth({ payload }) {
  const res = yield call(API.session.fetchAuth, payload);
  yield put(fetchAuthRoutine.success(res.data));
  yield put(push('/'));
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
  yield put(logoutRoutine.success);
}

export function* saga() {
  yield takeLatest(fetchSessionRoutine.TRIGGER, fetchSession);
  yield takeLatest(logoutRoutine.TRIGGER, fetchLogout);
  yield takeLatest(
    fetchAuthRoutine.TRIGGER,
    tryCatchWrapper(fetchAuth, fetchAuthRoutine),
  );
}
