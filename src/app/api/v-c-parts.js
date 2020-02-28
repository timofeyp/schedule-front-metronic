import { call } from 'redux-saga/effects';
import axios from 'axios';

export function* fetchVCParts() {
  return yield call(axios.get, '/api/v-c-parts/all');
}

export function* fetchSelectedVcParts() {
  return yield call(axios.get, '/api/v-c-parts/selected');
}

export default {
  fetchVCParts,
  fetchSelectedVcParts,
};
