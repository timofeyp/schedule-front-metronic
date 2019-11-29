import {
  fetchEventNamesRoutine,
  changeEventNameInputRoutine,
} from 'containers/CreateEvent/constants';
import produce from 'immer/dist/immer';

export const initialState = {
  eventNames: [],
  eventNameInput: '',
};

/* eslint-disable default-case, no-param-reassign */
const createEventReducer = (state = initialState, action) =>
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

export default createEventReducer;
