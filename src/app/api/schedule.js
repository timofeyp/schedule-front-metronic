import { call } from 'redux-saga/effects';
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

export function* updateEvent(data) {
  return yield call(axios.put, `/api/events/update`, data);
}

export function* localConfirmEvent(id) {
  return yield call(axios.put, `/api/events/local-confirm-event/${id}`);
}

export function* acceptEvent(id) {
  return yield call(axios.put, `/api/events/local-accept-event/${id}`);
}

export function* removeEvent(id) {
  return yield call(axios.put, `/api/events/local-remove-event/${id}`);
}

export default {
  fetchEvents,
  updateEvent,
  localConfirmEvent,
  fetchEvent,
  acceptEvent,
  removeEvent,
};
