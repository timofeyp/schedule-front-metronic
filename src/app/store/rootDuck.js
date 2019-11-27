import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import * as auth from './ducks/auth.duck';
import * as session from './ducks/session.duck';
import { metronic } from '../../_metronic';

export const rootReducer = combineReducers({
  auth: auth.reducer,
  session: session.reducer,
  i18n: metronic.i18n.reducer,
  builder: metronic.builder.reducer,
});

export function* rootSaga() {
  yield all([auth.saga(), session.saga()]);
}
