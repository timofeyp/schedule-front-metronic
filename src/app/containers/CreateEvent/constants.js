import createAction from 'utils/createAction';
export const fetchEventNamesRoutine = createAction(
  'FETCH_EVENT_NAMES',
  'createEvent',
);
export const changeEventNameInputRoutine = createAction(
  'CHANGE_EVENT_NAME_INPUT',
  'createEvent',
);

export const createEventRoutine = createAction('CREATE_EVENT', 'createEvent');
