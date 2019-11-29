import createAction from 'app/utils/createAction';
import produce from 'immer/dist/immer';
import {
  call,
  put,
  takeLatest,
  delay,
} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
import API from 'app/api';
import { fetchCurrentWeekEventsRoutine } from 'app/store/ducks/schedule.duck';
export const fetchEventRoutine = createAction('FETCH__EVENT', 'event');
export const eraseEventRoutine = createAction('ERASE__EVENT', 'event');
export const confirmLocalEventRoutine = createAction(
  'CONFIRM_LOCAL_EVENT',
  'event',
);
export const updateEventRoutine = createAction('UPDATE_EVENT', 'event');
export const debouncedUpdateEventRoutine = createAction(
  'UPDATE_EVENT_DEBOUNCED',
  'event',
);

export const initialState = {
  event: {},
};

/* eslint-disable default-case, no-param-reassign */
export const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case fetchEventRoutine.SUCCESS:
        draft.event = action.payload;
        break;
      case eraseEventRoutine.SUCCESS:
        draft.event = {};
        break;
    }
  });

function* fetchEvent({ payload }) {
  const res = yield call(API.schedule.fetchEvent, payload);
  yield put({ type: fetchEventRoutine.SUCCESS, payload: res.data });
}

function* updateEvent({ payload }) {
  const res = yield call(API.schedule.updateEvent, payload);
  yield put({
    type: updateEventRoutine.SUCCESS,
    payload: res.data,
  });
  yield put({ type: fetchCurrentWeekEventsRoutine.TRIGGER });
}

function* updateEventDebounced({ payload }) {
  const { arrayIndex, dayId } = payload;
  yield delay(500);
  const res = yield call(API.schedule.updateEventDebounced, payload);
  yield put({
    type: debouncedUpdateEventRoutine.SUCCESS,
    payload: { arrayIndex, data: res.data, dayId },
  });
}

function* localConfirmEvent({ payload }) {
  const id = payload;
  const res = yield call(API.schedule.localConfirmEvent, id);
  yield put({ type: fetchEventRoutine.TRIGGER, payload: { id } });
  yield put({ type: fetchCurrentWeekEventsRoutine.TRIGGER });
  yield put({ type: confirmLocalEventRoutine.SUCCESS, payload: res.data });
}

export function* saga() {
  yield takeLatest(fetchEventRoutine.TRIGGER, fetchEvent);
  yield takeLatest(confirmLocalEventRoutine.TRIGGER, localConfirmEvent);
  yield takeLatest(updateEventRoutine.TRIGGER, updateEvent);
  yield takeLatest(debouncedUpdateEventRoutine.TRIGGER, updateEventDebounced);
}
