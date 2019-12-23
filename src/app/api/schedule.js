import { call, delay } from 'redux-saga/effects';
import axios from 'axios';
import { isEmpty } from 'lodash';
import queryString from 'query-string';

export function* fetchEvents(data) {
  const query = queryString.stringify(data);
  return yield call(
    axios.get,
    `/api/events/get-week${!isEmpty(data) ? `?${query}` : ''}`,
  );
}

export function* fetchEvent(id) {
  return yield call(axios.get, `/api/events/get-event-data/${id}`);
}

export function* fetchVCParts() {
  return yield call(axios.get, '/api/events/get-vc-parts');
}

export function* fetchSelectedVcParts() {
  return yield call(axios.get, '/api/events/get-selected-vc-parts');
}

export function* updateEvent(data) {
  return yield call(axios.put, `/api/events/update`, data);
}

export function* updateEventDebounced(data) {
  yield delay(500);
  return yield call(axios.put, `/api/events/update`, data);
}
function* localConfirmEvent(id) {
  return yield call(axios.get, `/api/events/local-confirm-event/${id}`);
}

export default {
  fetchEvents,
  fetchVCParts,
  fetchSelectedVcParts,
  updateEvent,
  updateEventDebounced,
  localConfirmEvent,
  fetchEvent,
};
