import createAction from 'app/utils/createAction';
import produce from 'immer/dist/immer';
import {
  call,
  put,
  takeLatest,
  select,
} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
import API from 'app/api';
import { isEmpty } from 'lodash';

export const fetchEventsRoutine = createAction('FETCH_EVENTS', 'schedule');

export const fetchConcernEventsRoutine = createAction(
  'FETCH_CONCERN_EVENTS',
  'schedule',
);
export const fetchLocalEventsRoutine = createAction(
  'FETCH_LOCAL_EVENTS',
  'schedule',
);
export const eraseConcernEventsRoutine = createAction(
  'ERASE_CONCERN_EVENTS_EVENTS',
  'schedule',
);
export const updateConcernEventRoutine = createAction(
  'UPDATE_CONCERN_EVENT',
  'schedule',
);
export const updateLocalEventRoutine = createAction(
  'UPDATE_LOCAL_EVENT',
  'schedule',
);
export const updateScheduleEventRoutine = createAction(
  'UPDATE_LOCAL_EVENT',
  'schedule',
);

export const pushNewEventRoutine = createAction('PUSH_NEW_EVENT', 'schedule');

export const initialState = {
  concernEvents: [],
  localEvents: [],
};

/* eslint-disable default-case, no-param-reassign */
export const reducer = (state = initialState, { payload, type }) =>
  produce(state, draft => {
    switch (type) {
      case fetchConcernEventsRoutine.SUCCESS:
        draft.concernEvents = payload;
        break;
      case fetchLocalEventsRoutine.SUCCESS:
        draft.localEvents = payload;
        break;
      case eraseConcernEventsRoutine.SUCCESS:
        draft.concernEvents = [];
        break;
      case updateConcernEventRoutine.SUCCESS:
        draft.concernEvents[payload.eventIndex] = payload.event;
        break;
      case updateLocalEventRoutine.SUCCESS:
        draft.localEvents[payload.eventIndex] = payload.event;
        break;
      case pushNewEventRoutine.SUCCESS:
        if (payload.isLocal) {
          draft.localEvents.push(payload);
        } else {
          draft.concernEvents.push(payload);
        }
        break;
    }
  });

function* fetchEvents({ payload }) {
  if (payload.isConcern) {
    yield put(fetchConcernEventsRoutine.trigger());
  }
  if (payload.isLocal) {
    yield put(fetchLocalEventsRoutine.trigger());
  }
}

function* fetchConcernEvents() {
  const filter = yield select(store => store.settings.filter);
  const items = filter ? filter.map(item => item.value) : [];
  const filterItems = !isEmpty(items) ? { filter: items } : {};
  const res = yield call(API.schedule.fetchEvents, {
    ...filterItems,
    isConcern: true,
  });
  yield put(fetchConcernEventsRoutine.success(res.data));
}

function* fetchLocalEvents() {
  const res = yield call(API.schedule.fetchEvents, {
    isLocal: true,
  });
  yield put(fetchLocalEventsRoutine.success(res.data));
}

function* updadeScheduleEvent({ payload }) {
  const concernEvents = yield select(store => store.schedule.concernEvents);
  const localEvents = yield select(store => store.schedule.localEvents);
  const concernEventIndex = concernEvents.findIndex(e => e._id === payload._id);
  const localEventIndex = localEvents.findIndex(e => e._id === payload._id);
  if (concernEventIndex !== -1) {
    yield put(
      updateConcernEventRoutine.success({
        eventIndex: concernEventIndex,
        event: payload,
      }),
    );
  }
  if (localEventIndex !== -1) {
    yield put(
      updateLocalEventRoutine.success({
        eventIndex: localEventIndex,
        event: payload,
      }),
    );
  }
}

function* eraseConcernEvents() {
  yield put(eraseConcernEventsRoutine.success());
}

function* pushNewEvent({ payload }) {
  yield put(pushNewEventRoutine.success(payload));
}

export function* saga() {
  yield takeLatest(fetchConcernEventsRoutine.TRIGGER, fetchConcernEvents);
  yield takeLatest(fetchLocalEventsRoutine.TRIGGER, fetchLocalEvents);
  yield takeLatest(eraseConcernEventsRoutine.TRIGGER, eraseConcernEvents);
  yield takeLatest(fetchEventsRoutine.TRIGGER, fetchEvents);
  yield takeLatest(updateScheduleEventRoutine.TRIGGER, updadeScheduleEvent);
  yield takeLatest(pushNewEventRoutine.TRIGGER, pushNewEvent);
}
