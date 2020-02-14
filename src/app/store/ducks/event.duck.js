import createAction from 'app/utils/createAction';
import produce from 'immer/dist/immer';
import {
  call,
  put,
  takeLatest,
  delay,
} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
import API from 'app/api';
import { updateScheduleEventRoutine } from 'app/store/ducks/schedule.duck';
export const fetchEventRoutine = createAction('FETCH_EVENT', 'event');
export const eraseEventRoutine = createAction('ERASE_EVENT', 'event');
export const confirmLocalEventRoutine = createAction(
  'CONFIRM_LOCAL_EVENT',
  'event',
);
export const updateEventRoutine = createAction('UPDATE_EVENT', 'event');

export const initialState = {
  data: {},
};

/* eslint-disable default-case, no-param-reassign */
export const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case fetchEventRoutine.SUCCESS:
        draft.data = action.payload;
        break;
      case eraseEventRoutine.SUCCESS:
        draft.data = {};
        break;
      case updateEventRoutine.SUCCESS:
        draft.data = action.payload;
        break;
    }
  });

function* fetchEvent({ payload }) {
  const res = yield call(API.schedule.fetchEvent, payload);
  yield put(fetchEventRoutine.success(res.data));
}

function* updateEvent({ payload }) {
  const { isDebounced, event } = payload;
  if (isDebounced) {
    yield delay(500);
  }
  const res = yield call(API.schedule.updateEvent, event);
  yield put(updateEventRoutine.success(res.data));
  yield put(updateScheduleEventRoutine.trigger(res.data));
}

function* localConfirmEvent({ payload }) {
  const id = payload;
  yield call(API.schedule.localConfirmEvent, id);
  yield put(fetchEventRoutine.trigger(id));
  yield put(confirmLocalEventRoutine.success());
}

export function* saga() {
  yield takeLatest(fetchEventRoutine.TRIGGER, fetchEvent);
  yield takeLatest(confirmLocalEventRoutine.TRIGGER, localConfirmEvent);
  yield takeLatest(updateEventRoutine.TRIGGER, updateEvent);
}
