import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'app/components/Selects/Select';
import { fetchUsersRoutine } from 'app/store/ducks/ldap.duck';
import { FormContext } from 'app/containers/CreateEventModal/Form';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

const View = ({ ldapParts, fetchUsers }) => {
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  const { setFieldValue } = useContext(FormContext);
  const usersOptions = ldapParts.map(user => ({
    chipLabel: user.displayName,
    label: `${user.displayName} - ${
      user.userPrincipalName
    } - ${user.department || ''}`,
    value: user.userPrincipalName,
  }));
  const handleChange = users => {
    if (!isEmpty(users)) {
      users = users.map(e => e.value);
    } else {
      users = [];
    }
    setFieldValue('ldapParts', users);
  };
  return (
    <Select
      onInputCb={fetchUsers}
      onChange={handleChange}
      options={usersOptions}
      isShowEmpty
      isHandleInputChange
      isChipLabel
      placeholder="Выберите участников"
    />
  );
};

View.propTypes = {
  ldapParts: PropTypes.array,
  fetchUsers: PropTypes.func,
};

const mapStateToProps = store => ({
  ldapParts: store.ldap.users,
});

const mapDispatchToProps = {
  fetchUsers: fetchUsersRoutine.trigger,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
