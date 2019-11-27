import { call, put } from 'redux-saga/effects';

function tryCatchWrapper(generator, routine, errOpts = {}) {
  return function* saga(action) {
    try {
      yield put({ type: routine.REQUEST });
      yield call(generator, action);
    } catch (err) {
      if (!err.response) {
        return;
      }
      yield put({
        type: routine.FAILURE,
        payload: err.response.data,
      });
    } finally {
      yield put({ type: routine.FULFILL });
    }
  };
}

export default tryCatchWrapper;
