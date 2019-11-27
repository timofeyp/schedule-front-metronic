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
export const setAuthRoutine = createAction('SET_AUTH', 'session');
export const logoutRoutine = createAction('LOGOUT', 'session');

export const initialState = {
  profile: {},
  auth: false,
};

/* eslint-disable default-case, no-param-reassign */
export const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case setAuthRoutine.SUCCESS:
        if (!action.payload.failure) {
          draft.profile = action.payload;
          draft.auth = true;
        }
        break;
    }
    switch (action.type) {
      case fetchSessionRoutine.SUCCESS:
        draft.profile = action.payload;
        draft.auth = true;
        break;
    }
    switch (action.type) {
      case logoutRoutine.SUCCESS:
        draft.profile = {};
        draft.auth = false;
        break;
    }
    switch (action.type) {
      case fetchSessionRoutine.FAILURE:
        draft.profile = {};
        draft.auth = false;
        break;
    }
  });

function* fetchAuth({ payload }) {
  try {
    const res = yield call(API.session.fetchAuth, payload);
    yield put({ type: setAuthRoutine.SUCCESS, payload: res.data });
    yield put(push('/'));
  } catch (err) {
    yield put({
      type: setAuthRoutine.SUCCESS,
      payload: { failure: true, username: 'Ошибка', password: ' ' },
    });
  }
}

function* fetchSession() {
  try {
    const res = yield call(API.session.fetchSession, '/api/auth/session');
    yield put({ type: fetchSessionRoutine.SUCCESS, payload: res.data });
  } catch (err) {
    yield put({
      type: fetchSessionRoutine.FAILURE,
      payload: undefined,
    });
  }
}

function* fetchLogout() {
  yield call(API.session.fetchLogout, '/api/auth/logout');
  yield put({ type: logoutRoutine.SUCCESS });
}

export const actions = {
  login: setAuthRoutine.trigger,
};

export function* saga() {
  yield takeLatest(setAuthRoutine.TRIGGER, fetchAuth);
  yield takeLatest(fetchSessionRoutine.TRIGGER, fetchSession);
  yield takeLatest(logoutRoutine.TRIGGER, fetchLogout);
}
