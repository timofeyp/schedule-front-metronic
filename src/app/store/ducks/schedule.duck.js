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
export const fetchCurrentWeekEventsRoutine = createAction(
  'FETCH_CURRNET_WEEK_EVENTS',
  'schedule',
);
export const eraseCurrentWeekEventsRoutine = createAction(
  'ERASE_CURRNET_WEEK_EVENTS',
  'schedule',
);
export const updateEventByIndexRoutine = createAction(
  'UPDATE_EVENT_BY_INDEX',
  'schedule',
);

export const initialState = {
  currentWeekEvents: [],
};

/* eslint-disable default-case, no-param-reassign */
export const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case fetchCurrentWeekEventsRoutine.SUCCESS:
        draft.currentWeekEvents = action.payload;
        break;
      case eraseCurrentWeekEventsRoutine.SUCCESS:
        draft.currentWeekEvents = [];
        break;
      case updateEventByIndexRoutine.SUCCESS:
        draft.currentWeekEvents[action.payload.eventIndex] =
          action.payload.event;
        break;
    }
  });

function* fetchCurrentWeekEvents({ payload }) {
  const { isVideo, isLocal } = payload;
  const filter = yield select(store => store.settings.filter);
  const items = filter ? filter.map(item => item.value) : [];
  let data = {};
  const filterItems = !isEmpty(items) ? { filter: items } : {};
  if (isVideo) {
    data = { ...filterItems, isVideo };
  }
  if (isLocal) {
    data = { isLocal };
  }
  const res = yield call(API.schedule.fetchEvents, data);
  yield put(fetchCurrentWeekEventsRoutine.success(res.data));
}

function* eraseCurrentWeekEvents() {
  yield put(eraseCurrentWeekEventsRoutine.success());
}

export function* saga() {
  yield takeLatest(
    fetchCurrentWeekEventsRoutine.TRIGGER,
    fetchCurrentWeekEvents,
  );
  yield takeLatest(
    eraseCurrentWeekEventsRoutine.TRIGGER,
    eraseCurrentWeekEvents,
  );
}
