import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const FilterSelect = ({ defaultFilter, onChange, options }) => {
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
      defaultValue={defaultFilter}
      onChange={onChange}
      isMulti
      options={options}
      noOptionsMessage={() => 'Не найдено'}
      placeholder="Выберите филиалы"
    />
  );
};

FilterSelect.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array,
  defaultFilter: PropTypes.array,
};

const mapStateToProps = store => ({
  defaultFilter: store.settings.filter,
});

export default connect(mapStateToProps, null)(FilterSelect);
