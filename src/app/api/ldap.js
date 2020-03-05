import { call } from 'redux-saga/effects';
import axios from 'axios';

export function* fetchUsers(value) {
  value = value || '';
  return yield call(axios.get, `/api/ldap/users?search=${value}`);
}

export default {
  fetchUsers,
};
