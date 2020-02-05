import createAction from 'app/utils/createAction';

import produce from 'immer/dist/immer';
import {
  filterDef as localStorageFilter,
  isExtraInfo,
  setExtraInfo,
  setFilter,
} from 'app/utils/localstorage';
import {
  put,
  takeLatest,
} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
import { fetchCurrentWeekEventsRoutine } from 'app/store/ducks/schedule.duck';
import { defaultFilter } from 'app/store/constants';
import { isEmpty } from 'lodash';

export const toggleExtraInfoRoutine = createAction(
  'TOGGLE_EXTRA_INFO',
  'settings',
);
export const updateFilterRoutine = createAction('UPDATE_FILTER', 'settings');
export const toggleShowCreateModal = createAction(
  'TOGGLE_SHOW_CREATE',
  'settings',
);

export const initialState = {
  isExtraInfo,
  filter: isEmpty(localStorageFilter) ? defaultFilter : localStorageFilter,
  isShowCreateModal: false,
};

/* eslint-disable default-case, no-param-reassign */
export const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case toggleExtraInfoRoutine.SUCCESS:
        draft.isExtraInfo = action.payload;
        break;
      case updateFilterRoutine.SUCCESS:
        draft.filter = action.payload;
        break;
      case toggleShowCreateModal.SUCCESS:
        draft.isShowCreateModal = action.payload;
        break;
    }
  });

function* updateFilter({ payload }) {
  setFilter(payload);
  yield put(updateFilterRoutine.success(payload));
  yield put(fetchCurrentWeekEventsRoutine.trigger({ isVideo: true }));
}

function* toggleExtraInfo({ payload }) {
  setExtraInfo(payload);
  yield put(toggleExtraInfoRoutine.success(payload));
}

export function* saga() {
  yield takeLatest(updateFilterRoutine.TRIGGER, updateFilter);
  yield takeLatest(toggleExtraInfoRoutine.TRIGGER, toggleExtraInfo);
}
