import React, { useEffect } from 'react';
import ParticipantsSelect from 'app/components/Selects/Participants';
import { fetchVCPartsRoutine } from 'app/store/ducks/vcparts.duck';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Participants = ({
  isLocal,
  LDAPUsers,
  VCParts,
  fetchVCParts,
  fetchLDAPUsers,
}) => {
  useEffect(() => (isLocal ? fetchLDAPUsers() : fetchVCParts()), [
    fetchLDAPUsers,
    fetchVCParts,
    isLocal,
  ]);
  return <ParticipantsSelect />;
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
  fetchVCParts: fetchVCPartsRoutine,
};

export default connect(mapStateToProps, mapDispatchToProps)(Participants);
