import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { makeSelectSelectedVCParts } from 'containers/Schedule/selectors';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { updateFilterRoutine } from 'containers/App/settings/constants';
import { makeSelectFilter } from 'containers/App/settings/selectors';
import { filterDef } from 'utils/localstorage';

const Filter = ({ currentWeekVCParts, updateFilter }) => {
  const currentWeekVCPartsArray = currentWeekVCParts || [];

  const handleSelect = values => {
    updateFilter(values);
  };

  return (
    <Select
      defaultValue={filterDef}
      onChange={handleSelect}
      isMulti
      options={currentWeekVCPartsArray}
      placeholder="Выберите филиалы"
    />
  );
};

Filter.propTypes = {
  currentWeekVCParts: PropTypes.array,
  updateFilter: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currentWeekVCParts: makeSelectSelectedVCParts(),
  filter: makeSelectFilter(),
});

const mapDispatchToProps = {
  updateFilter: events => updateFilterRoutine.trigger(events),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter);
