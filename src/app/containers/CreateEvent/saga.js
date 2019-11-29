import {
  call,
  put,
  takeLatest,
  delay,
} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
import {
  fetchEventNamesRoutine,
  changeEventNameInputRoutine,
  createEventRoutine,
} from 'containers/CreateEvent/constants';
import axios from 'utils/axios';
import { fetchCurrentWeekEventsRoutine } from 'containers/Schedule/constants';
import moment from 'moment';
import { toggleShowCreateModal } from 'containers/App/settings/constants';

function* fetchNames({ payload }) {
  yield put(changeEventNameInputRoutine.success(payload));
  yield delay(300);
  const res = yield call(axios.get, `/api/events/names/${payload}`);
  const eventNames = res.data.map(eventName => ({
    value: eventName.name,
    label: eventName.name,
  }));
  yield put(fetchEventNamesRoutine.success(eventNames));
}

function* createEvent({
  payload: { eventName, timeStart, timeEnd, dateStart, localRoom },
}) {
  const query = {
    eventName,
    timeStart,
    timeEnd,
    dateStart,
    yearMonthDay: moment(dateStart).format('DD-MM-YYYY'),
    localRoom,
    VCPartsIDs: [7],
    VCParts: [
      {
        groupName: 'Локальное мероприятие',
        VCParts: [
          {
            id: 7,
            name: 'Ленинградская АЭС',
          },
        ],
      },
    ],
  };
  yield call(axios.post, `/api/events/create`, query);
  yield put(fetchCurrentWeekEventsRoutine.trigger());
  yield put(toggleShowCreateModal.success(false));
  yield put(changeEventNameInputRoutine.success(''));
}

export default function* defaultSaga() {
  yield takeLatest(fetchEventNamesRoutine.TRIGGER, fetchNames);
  yield takeLatest(createEventRoutine.TRIGGER, createEvent);
}
