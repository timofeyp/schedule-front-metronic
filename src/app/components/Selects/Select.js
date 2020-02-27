import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const View = ({ defaultValue, onChange, options, placeholder }) => {
  const customStyles = {
    control: provided => ({
      ...provided,
      borderColor: '#a2a5b9',
      '&:hover': { borderColor: '#4596d180' },
      boxShadow: 'none',
    }),
  };
  return (
    <Select
      styles={customStyles}
      defaultValue={defaultValue}
      onChange={onChange}
      isMulti
      options={options}
      noOptionsMessage={() => 'Не найдено'}
      placeholder={placeholder}
    />
  );
};

View.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array,
  defaultValue: PropTypes.array,
  placeholder: PropTypes.string,
};

export default View;
