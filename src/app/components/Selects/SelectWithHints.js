import React from 'react';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import {
  fetchEventNamesRoutine,
  changeEventNameInputRoutine,
} from 'app/store/ducks/creating.duck';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

export const dot = () => ({
  alignItems: 'center',
  display: 'flex',
  padding: '0 8px',
});

const View = ({ options, eventNameInput }) => {
  const dispatch = useDispatch();
  const onInputChange = (value, { action }) => {
    if (
      action === 'menu-close' ||
      action === 'input-blur' ||
      action === 'set-value'
    ) {
      return undefined;
    }
    dispatch(fetchEventNamesRoutine.trigger(value));
    return value;
  };

  const onChange = value => {
    dispatch(changeEventNameInputRoutine.success(value.value));
  };
  const menuOpacity = isEmpty(options) ? 0 : 1;
  const arr = [{value: 1, label: 1}]
  return (
    <Select
      options={arr}
      isSearchable
      isClearable={false}
      placeholder="Название"
      objectValue={eventNameInput}
      inputValue={eventNameInput}
      value={eventNameInput}
      skipEnter
      onChange={onChange}
      onInputChange={onInputChange}
      noOptionsMessage={() => ''}
      styles={{
        valueContainer: styles => ({ ...styles, padding: '0 8px' }),
        input: styles => ({
          ...styles,
          padding: '0 8px',
          opacity: '1 !important',
          overflow: 'hidden',
        }),
        placeholder: styles => ({ ...styles, padding: '0 8px' }),
        dropdownIndicator: () => ({ display: 'none' }),
      }}
    />
  );
};

View.propTypes = {
  options: PropTypes.array,
  eventNameInput: PropTypes.string,
};

export default View;
