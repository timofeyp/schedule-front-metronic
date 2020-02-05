import createAction from 'app/utils/createAction';
import produce from 'immer/dist/immer';
import {
  call,
  put,
  takeLatest,
} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
import API from 'app/api';

export const fetchVCPartsRoutine = createAction('FETCH_VC_PARTS', 'vcparts');
export const fetchSelectedVCPartsRoutine = createAction(
  'FETCH_SELECTED_VC_PARTS',
  'vcparts',
);
export const eraseVCPartsRoutine = createAction('ERASE_VC_PARTS', 'vcparts');

export const initialState = {
  VCParts: [],
  selectedVCParts: [],
};

/* eslint-disable default-case, no-param-reassign */
export const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case fetchVCPartsRoutine.SUCCESS:
        draft.VCParts = action.payload;
        break;
      case fetchSelectedVCPartsRoutine.SUCCESS:
        draft.selectedVCParts = action.payload;
        break;
      case eraseVCPartsRoutine.SUCCESS:
        draft.selectedVCParts = [];
        draft.VCParts = [];
        break;
    }
  });

function* fetchVcParts() {
  const res = yield call(API.schedule.fetchVCParts);
  yield put({ type: fetchVCPartsRoutine.SUCCESS, payload: res.data });
}

function* fetchSelectedVcParts() {
  const res = yield call(API.schedule.fetchSelectedVcParts);
  yield put({ type: fetchSelectedVCPartsRoutine.SUCCESS, payload: res.data });
}

function* eraseVcParts() {
  yield put(fetchSelectedVCPartsRoutine.success());
}

export function* saga() {
  yield takeLatest(fetchVCPartsRoutine.TRIGGER, fetchVcParts);
  yield takeLatest(fetchSelectedVCPartsRoutine.TRIGGER, fetchSelectedVcParts);
  yield takeLatest(eraseVCPartsRoutine.TRIGGER, eraseVcParts);
}
