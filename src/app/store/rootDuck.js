import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import * as auth from 'app/store/ducks/auth.duck';
import * as session from 'app/store/ducks/session.duck';
import * as schedule from 'app/store/ducks/schedule.duck';
import { metronic } from '../../_metronic';

export const rootReducer = combineReducers({
  auth: auth.reducer,
  session: session.reducer,
  schedule: schedule.reducer,
  i18n: metronic.i18n.reducer,
  builder: metronic.builder.reducer,
});

export function* rootSaga() {
  yield all([auth.saga(), session.saga(), schedule.saga()]);
}
