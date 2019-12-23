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
  return (
    <div className="form__form-group-input-wrap">
      <Select
        options={options}
        isSearchable
        isClearable={false}
        className="react-select react-select-editable"
        classNamePrefix="react-select"
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
          menu: styles => ({ ...styles, opacity: menuOpacity }),
          noOptionsMessage: styles => ({ ...styles, opacity: menuOpacity }),
        }}
      />
    </div>
  );
};

View.propTypes = {
  options: PropTypes.array,
  eventNameInput: PropTypes.string,
};

export default View;
