import createAction from 'app/utils/createAction';
import produce from 'immer/dist/immer';
import {
  call,
  put,
  takeLatest,
} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
import API from 'app/api';

export const fetchVCPartsRoutine = createAction('FETCH_VC_PARTS', 'v-c-parts');
export const fetchSelectedVCPartsRoutine = createAction(
  'FETCH_SELECTED_VC_PARTS',
  'v-c-parts',
);
export const eraseVCPartsRoutine = createAction('ERASE_VC_PARTS', 'v-c-parts');

export const initialState = {
  all: [],
  selected: [],
};

/* eslint-disable default-case, no-param-reassign */
export const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case fetchVCPartsRoutine.SUCCESS:
        draft.all = action.payload;
        break;
      case fetchSelectedVCPartsRoutine.SUCCESS:
        draft.selected = action.payload;
        break;
      case eraseVCPartsRoutine.SUCCESS:
        draft.selected = [];
        draft.all = [];
        break;
    }
  });

function* fetchVCParts() {
  const res = yield call(API.VCParts.fetchVCParts);
  yield put({ type: fetchVCPartsRoutine.SUCCESS, payload: res.data });
}

function* fetchSelectedVCParts() {
  const res = yield call(API.VCParts.fetchSelectedVcParts);
  yield put({ type: fetchSelectedVCPartsRoutine.SUCCESS, payload: res.data });
}

function* eraseVCParts() {
  yield put(fetchSelectedVCPartsRoutine.success());
}

export function* saga() {
  yield takeLatest(fetchVCPartsRoutine.TRIGGER, fetchVCParts);
  yield takeLatest(fetchSelectedVCPartsRoutine.TRIGGER, fetchSelectedVCParts);
  yield takeLatest(eraseVCPartsRoutine.TRIGGER, eraseVCParts);
}
