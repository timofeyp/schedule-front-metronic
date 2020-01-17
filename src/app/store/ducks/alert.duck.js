import createAction from 'app/utils/createAction';
import produce from 'immer/dist/immer';
import {
  put,
  takeEvery,
  select,
  delay,
} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
export const toggleShowAlert = createAction('TOGGLE_SHOW_ALERT', 'alert');
export const updateAlertList = createAction('UPDATE_ALERT_LIST', 'alert');

export const initialState = {
  list: [],
};

/* eslint-disable default-case, no-param-reassign */
export const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case toggleShowAlert.SUCCESS:
        draft.list.push(action.payload);
        break;
      case updateAlertList.SUCCESS:
        draft.list = action.payload;
        break;
    }
  });

function* initAlert({ payload }) {
  yield put(toggleShowAlert.success(payload));
  yield delay(10000);
  const alertList = yield select(store => store.alert.list);
  const alertListCopy = [...alertList];
  alertListCopy.shift();
  yield put(updateAlertList.success(alertListCopy));
}

export function* saga() {
  yield takeEvery(toggleShowAlert.TRIGGER, initAlert);
}
