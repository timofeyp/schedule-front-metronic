import { call, delay } from 'redux-saga/effects';
import axios from 'axios';

export function* fetchEventsAdmin(data) {
  return yield call(axios.post, '/api/events/get-week-admin', data);
}

export function* fetchEvents(data) {
  return yield call(axios.post, '/api/events/get-week', data);
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
  fetchEventsAdmin,
  fetchEvents,
  fetchVCParts,
  fetchSelectedVcParts,
  updateEvent,
  updateEventDebounced,
  localConfirmEvent,
  fetchEvent,
};
