import { createSelector } from 'reselect';
import initialState from 'containers/App/settings/reducer';

const selectRouter = state => state.createEvent || initialState;

const makeSelectEventNames = () =>
  createSelector(
    selectRouter,
    createEventState => createEventState.eventNames,
  );

const makeSelectEventNameInput = () =>
  createSelector(
    selectRouter,
    createEventState => createEventState.eventNameInput,
  );

export { makeSelectEventNames, makeSelectEventNameInput };
