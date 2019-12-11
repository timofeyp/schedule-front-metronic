import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { filterDef } from 'app/utils/localstorage';

const FilterSelect = ({ onChange, options }) => {
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
      defaultValue={filterDef}
      onChange={onChange}
      isMulti
      options={options}
      placeholder="Выберите филиалы"
    />
  );
};

FilterSelect.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array,
};

export default FilterSelect;
