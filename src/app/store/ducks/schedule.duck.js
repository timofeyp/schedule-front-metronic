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
import { debouncedUpdateEventRoutine } from 'app/store/ducks/event.duck';
export const fetchCurrentWeekEventsRoutine = createAction(
  'FETCH_CURRNET_WEEK_EVENTS',
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
  const profile = yield select(store => store.session.profile);
  const filter = yield select(store => store.settings.filter);
  const items = filter ? filter.map(item => item.value) : [];
  const data = !isEmpty(items) ? { filter: items } : {};
  let res;
  if (profile.isAdmin) {
    res = yield call(API.schedule.fetchEventsAdmin, data);
  } else {
    res = yield call(API.schedule.fetchEvents, data);
  }
  yield put(fetchCurrentWeekEventsRoutine.success(res.data));
}

export function* saga() {
  yield takeLatest(
    fetchCurrentWeekEventsRoutine.TRIGGER,
    fetchCurrentWeekEvents,
  );
}
