import createAction from 'app/utils/createAction';
import produce from 'immer/dist/immer';
import {
  call,
  put,
  takeLatest,
  delay,
} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
import API from 'app/api';

export const fetchUsersRoutine = createAction('FETCH_USERS', 'users');

export const initialState = {
  users: [],
};

/* eslint-disable default-case, no-param-reassign */
export const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case fetchUsersRoutine.SUCCESS:
        draft.users = action.payload;
        break;
    }
  });

function* fetchUsers({ payload }) {
  yield delay(500);
  const res = yield call(API.ldap.fetchUsers, payload);
  yield put({ type: fetchUsersRoutine.SUCCESS, payload: res.data });
}

export function* saga() {
  yield takeLatest(fetchUsersRoutine.TRIGGER, fetchUsers);
}
