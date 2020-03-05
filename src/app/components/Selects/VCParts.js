import React, { useContext, useEffect } from 'react';
import Select from 'app/components/Selects/Select';
import { fetchVCPartsRoutine } from 'app/store/ducks/v-c-parts.duck';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormContext } from 'app/containers/CreateEventModal/Form';

const View = ({ VCParts, fetchVCParts }) => {
  useEffect(() => {
    fetchVCParts();
  }, [fetchVCParts]);
  const {
    setFieldValue,
    values: { VCPartsIDs },
  } = useContext(FormContext);
  const VCPartsOptions = VCParts.map(part => ({
    label: part.name,
    value: part.id,
  }));
  const defaultValue = VCPartsOptions.filter(el =>
    VCPartsIDs.includes(el.value),
  );
  const handleChange = participants => {
    participants = participants.map(e => e.value);
    setFieldValue('VCPartsIDs', participants);
  };

  return (
    <Select
      defaultValue={defaultValue}
      onChange={handleChange}
      options={VCPartsOptions}
      placeholder="Выберите участников"
    />
  );
};

View.propTypes = {
  VCParts: PropTypes.array,
  fetchVCParts: PropTypes.func,
};

const mapStateToProps = store => ({
  VCParts: store.vcparts.all,
});

const mapDispatchToProps = {
  fetchVCParts: fetchVCPartsRoutine.trigger,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
