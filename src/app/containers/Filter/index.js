import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateFilterRoutine } from 'app/store/ducks/settings.duck';
import FilterSelect from 'app/components/Selects/FilterSelect';
import { isEmpty } from 'lodash';

const Filter = ({ currentWeekVCParts, updateFilter }) => {
  const handleSelect = values => {
    updateFilter(values);
  };
  if (!isEmpty(currentWeekVCParts)) {
    return (
      <FilterSelect onChange={handleSelect} options={currentWeekVCParts} />
    );
  }
  return null;
};

Filter.propTypes = {
  currentWeekVCParts: PropTypes.array,
  updateFilter: PropTypes.func,
};

const mapStateToProps = store => ({
  currentWeekVCParts: store.vcparts.selectedVCParts,
  filter: store.settings.filter,
});

const mapDispatchToProps = {
  updateFilter: updateFilterRoutine.trigger,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
