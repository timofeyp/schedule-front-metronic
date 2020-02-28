import React, { useEffect, useMemo } from 'react';
import ParticipantsSelect from 'app/components/Selects/Participants';
import { fetchVCPartsRoutine } from 'app/store/ducks/v-c-parts.duck';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Participants = ({
  isLocal,
  LDAPUsers,
  VCParts,
  fetchVCParts,
  fetchLDAPUsers,
}) => {
  const VCPartsOptions = VCParts.map(part => ({
    label: part.name,
    value: part.id,
  }));
  useEffect(() => {
    if (isLocal) {
      fetchLDAPUsers();
    } else {
      fetchVCParts();
    }
  }, [fetchLDAPUsers, fetchVCParts, isLocal]);
  return <ParticipantsSelect options={VCPartsOptions} />;
};

Participants.propTypes = {
  isLocal: PropTypes.bool,
  LDAPUsers: PropTypes.array,
  VCParts: PropTypes.array,
  fetchVCParts: PropTypes.func,
  fetchLDAPUsers: PropTypes.func,
};

const mapStateToProps = store => ({
  VCParts: store.vcparts.all,
  LDAPUsers: store.ldap.users,
});

const mapDispatchToProps = {
  fetchVCParts: fetchVCPartsRoutine.trigger,
};

export default connect(mapStateToProps, mapDispatchToProps)(Participants);
