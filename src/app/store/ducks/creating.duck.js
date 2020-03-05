import createAction from 'app/utils/createAction';
import produce from 'immer/dist/immer';
import {
  call,
  put,
  takeLatest,
  delay,
  select,
} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';
import API from 'app/api';
import moment from 'moment';
import { toggleShowCreateModal } from 'app/store/ducks/settings.duck';
import { pushNewEventRoutine } from 'app/store/ducks/schedule.duck';
import { toggleShowAlert } from 'app/store/ducks/alert.duck';
export const fetchEventNamesRoutine = createAction(
  'FETCH_EVENT_NAMES',
  'creating',
);
export const changeEventNameInputRoutine = createAction(
  'CHANGE_EVENT_NAME_INPUT',
  'creating',
);
export const createEventRoutine = createAction('CREATE_EVENT', 'creating');

export const initialState = {
  eventNames: [],
  eventNameInput: '',
};

/* eslint-disable default-case, no-param-reassign */
export const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case fetchEventNamesRoutine.SUCCESS:
        draft.eventNames = action.payload;
        break;
      case changeEventNameInputRoutine.SUCCESS:
        draft.eventNameInput = action.payload;
        break;
    }
  });

function* fetchNames({ payload }) {
  yield put(changeEventNameInputRoutine.success(payload));
  yield delay(300);
  const res = yield call(API.creating.fetchNames, payload);
  const eventNames = res.data.map(eventName => ({
    value: eventName.name,
    label: eventName.name,
  }));
  yield put(fetchEventNamesRoutine.success(eventNames));
}

function* createEvent({ payload }) {
  const isAdmin = yield select(state => state.session.profile.isAdmin);
  const { isLocal, dateTimeStart, dateTimeEnd, dateStart } = payload;
  const query = {
    timeStart: moment(dateTimeStart).format('HH:mm'),
    timeEnd: moment(dateTimeEnd).format('HH:mm'),
    dateStart,
    yearMonthDay: moment(dateStart).format('DD-MM-YYYY'),
    isLocal,
    ...payload,
  };
  try {
    const res = yield call(API.creating.createEvent, query);
    yield put(createEventRoutine.success());
    if (isAdmin) {
      yield put(pushNewEventRoutine.trigger(res.data));
    }
    yield put(
      toggleShowAlert.trigger({
        variant: 'success',
        text: isAdmin
          ? 'Мероприятие добавлено успешно!'
          : 'Мероприятие отправлено оператору на проверку. Ожидайте появления в расписании!',
      }),
    );
  } catch {
    yield put(
      toggleShowAlert.trigger({
        variant: 'danger',
        text: 'При добавлении мероприятия произошла ошибка!',
      }),
    );
  }
  yield put(toggleShowCreateModal.success(false));
  yield put(changeEventNameInputRoutine.success(''));
}

export function* saga() {
  yield takeLatest(fetchEventNamesRoutine.TRIGGER, fetchNames);
  yield takeLatest(createEventRoutine.TRIGGER, createEvent);
}
