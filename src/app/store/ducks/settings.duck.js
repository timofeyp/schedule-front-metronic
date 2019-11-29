import createAction from 'app/utils/createAction';

import produce from 'immer/dist/immer';
import { filterDef, showInfoValue, setFilter } from 'app/utils/localstorage';

import {
  put,
  takeLatest,
} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';

import { fetchCurrentWeekEventsRoutine } from 'app/store/ducks/schedule.duck';
export const toggleShowInfoRoutine = createAction(
  'TOGGLE_SHOW_INFO',
  'settings',
);
export const updateFilterRoutine = createAction('UPDATE_FILTER', 'settings');
export const toggleShowCreateModal = createAction(
  'TOGGLE_SHOW_CREATE',
  'settings',
);

export const initialState = {
  showInfoValue,
  filter: filterDef,
  showCreateModal: false,
};

/* eslint-disable default-case, no-param-reassign */
export const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case toggleShowInfoRoutine.SUCCESS:
        draft.showInfoValue = action.payload;
        break;
      case updateFilterRoutine.SUCCESS:
        draft.filter = action.payload;
        break;
      case toggleShowCreateModal.SUCCESS:
        draft.showCreateModal = action.payload;
        break;
    }
  });

function* updateFilter({ payload }) {
  setFilter(payload);
  yield put(updateFilterRoutine.success(payload));
  yield put(fetchCurrentWeekEventsRoutine.trigger());
}

export function* saga() {
  yield takeLatest(updateFilterRoutine.TRIGGER, updateFilter);
}
