import createAction from 'app/utils/createAction';
import produce from 'immer/dist/immer';
import {
  call,
  put,
  takeLatest,
  select,
  delay,
} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
import API from 'app/api';
import { isEmpty } from 'lodash';
export const fetchCurrentWeekEventsRoutine = createAction(
  'FETCH_CURRNET_WEEK_EVENTS',
  'schedule',
);
export const fetchVCPartsRoutine = createAction('FETCH_VC_PARTS', 'schedule');
export const fetchSelectedVCPartsRoutine = createAction(
  'FETCH_SELECTED_VC_PARTS',
  'schedule',
);
export const fetchEventRoutine = createAction('FETCH__EVENT', 'schedule');
export const eraseEventRoutine = createAction('ERASE__EVENT', 'schedule');
export const confirmLocalEventRoutine = createAction(
  'CONFIRM_LOCAL_EVENT',
  'schedule',
);
export const cancelLocalEventRoutine = createAction(
  'CANCEL_LOCAL_EVENT',
  'schedule',
);
export const updateEventRoutine = createAction('UPDATE_EVENT', 'schedule');
export const debouncedUpdateEventRoutine = createAction(
  'UPDATE_EVENT_DEBOUNCED',
  'schedule',
);

export const initialState = {
  currentWeekEvents: [],
  event: {},
  VCParts: [],
  selectedVCParts: [],
};

/* eslint-disable default-case, no-param-reassign */
export const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case fetchCurrentWeekEventsRoutine.SUCCESS:
        draft.currentWeekEvents = action.payload;
        break;
      case fetchEventRoutine.SUCCESS:
        draft.event = action.payload;
        break;
      case eraseEventRoutine.SUCCESS:
        draft.event = {};
        break;
      case fetchVCPartsRoutine.SUCCESS:
        draft.VCParts = action.payload;
        break;
      case fetchSelectedVCPartsRoutine.SUCCESS:
        draft.selectedVCParts = action.payload;
        break;
      case debouncedUpdateEventRoutine.SUCCESS:
        state.currentWeekEvents[action.payload.dayId].events[
          action.payload.arrayIndex
        ] = {
          ...action.payload.data,
          confirms:
            state.currentWeekEvents[action.payload.dayId].events[
              action.payload.arrayIndex
            ].confirms,
        };
        draft.currentWeekEvents[action.payload.dayId] =
          state.currentWeekEvents[action.payload.dayId];
        break;
    }
  });

function* fetchCurrentWeekEvents() {
  const profile = yield select();
  const filter = yield select();
  const items = filter ? filter.map(item => item.value) : [];
  const data = !isEmpty(items) ? { filter: items } : {};
  let res;
  if (profile.isAdmin) {
    res = yield call(API.schedule.fetchEventsAdmin, data);
  } else {
    res = yield call(API.schedule.fetchEvents, data);
  }
  yield put({ type: fetchCurrentWeekEventsRoutine.SUCCESS, payload: res.data });
}

function* fetchVcParts() {
  const res = yield call(API.schedule.fetchVCParts);
  yield put({ type: fetchVCPartsRoutine.SUCCESS, payload: res.data });
}

function* fetchSelectedVcParts() {
  const res = yield call(API.schedule.fetchSelectedVcParts);
  yield put({ type: fetchSelectedVCPartsRoutine.SUCCESS, payload: res.data });
}

function* fetchEvent({ payload }) {
  const res = yield call(API.schedule.fetchEvent, payload.id);
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
  yield takeLatest(
    fetchCurrentWeekEventsRoutine.TRIGGER,
    fetchCurrentWeekEvents,
  );
  yield takeLatest(fetchEventRoutine.TRIGGER, fetchEvent);
  yield takeLatest(fetchVCPartsRoutine.TRIGGER, fetchVcParts);
  yield takeLatest(fetchSelectedVCPartsRoutine.TRIGGER, fetchSelectedVcParts);
  yield takeLatest(confirmLocalEventRoutine.TRIGGER, localConfirmEvent);
  yield takeLatest(updateEventRoutine.TRIGGER, updateEvent);
  yield takeLatest(debouncedUpdateEventRoutine.TRIGGER, updateEventDebounced);
}
