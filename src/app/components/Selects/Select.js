import React from 'react';
import Select, { components } from 'react-select';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

const MultiValue = props => (
  <components.MultiValue {...props}>
    {/* eslint-disable-next-line react/prop-types */}
    {props.data.chipLabel}
  </components.MultiValue>
);

const View = ({
  defaultValue,
  onChange,
  options,
  placeholder,
  isShowEmpty,
  onInputCb,
  isChipLabel,
  isHandleInputChange,
}) => {
  const customStyles = {
    control: provided => ({
      ...provided,
      borderColor: '#a2a5b9',
      '&:hover': { borderColor: '#4596d180' },
      boxShadow: 'none',
    }),
  };
  const onInputChange = (value, { action }) => {
    if (
      action === 'menu-close' ||
      action === 'input-blur' ||
      action === 'set-value'
    ) {
      return undefined;
    }
    onInputCb(value);
    return value;
  };
  if (!isEmpty(options) || isShowEmpty) {
    return (
      <Select
        components={isChipLabel && { MultiValue }}
        onInputChange={isHandleInputChange && onInputChange}
        styles={customStyles}
        defaultValue={defaultValue}
        onChange={onChange}
        isMulti
        options={options}
        noOptionsMessage={() => 'Не найдено'}
        placeholder={placeholder}
      />
    );
  }
  return null;
};

View.propTypes = {
  isChipLabel: PropTypes.bool,
  isHandleInputChange: PropTypes.bool,
  onChange: PropTypes.func,
  onInputCb: PropTypes.func,
  options: PropTypes.array,
  defaultValue: PropTypes.array,
  placeholder: PropTypes.string,
  isShowEmpty: PropTypes.bool,
};

export default View;
