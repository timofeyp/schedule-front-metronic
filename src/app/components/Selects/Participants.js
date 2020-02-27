import React from 'react';
import Select from 'app/components/Selects/Select';
import PropTypes from 'prop-types';

const FilterSelect = ({ onChange, options }) => (
  <Select
    onChange={onChange}
    options={options}
    placeholder="Выберите участников"
  />
);

FilterSelect.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array,
};

export default FilterSelect;
