import React from 'react';
import Select from 'app/components/Selects/Select';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Filter = ({ defaultFilter, onChange, options }) => (
  <Select
    defaultValue={defaultFilter}
    onChange={onChange}
    options={options}
    placeholder="Выберите филиалы"
  />
);

Filter.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array,
  defaultFilter: PropTypes.array,
};

const mapStateToProps = store => ({
  defaultFilter: store.settings.filter,
});

export default connect(mapStateToProps, null)(Filter);
