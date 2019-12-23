import { call } from 'redux-saga/effects';
import axios from 'axios';

export function* fetchNames(value) {
  return yield call(axios.get, `/api/events/names/${value}`);
}

export function* createEvent(values) {
  return yield call(axios.post, '/api/events/create', values);
}

export default {
  createEvent,
  fetchNames,
};
