import { call } from 'redux-saga/effects';
import axios from 'axios';

export function* fetchAuth(values) {
  return yield call(axios.post, '/api/auth/login-ldap', values);
}

export function* fetchSession() {
  return yield call(axios.get, '/api/auth/session');
}

export function* fetchLogout() {
  return yield call(axios.get, '/api/auth/logout');
}

export default {
  fetchAuth,
  fetchSession,
  fetchLogout,
};
