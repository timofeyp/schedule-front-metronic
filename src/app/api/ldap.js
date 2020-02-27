import { call } from 'redux-saga/effects';
import axios from 'axios';

export function* fetchUsers(value) {
  return yield call(axios.get, `/api/ldap/names/${value}`);
}

export default {
  fetchUsers,
};
