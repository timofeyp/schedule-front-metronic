import React from 'react';
import PropTypes from 'prop-types';
import Tabs from 'app/components/Tabs';
import MainInfo from 'app/containers/CreateEventModal/MainInfo';
import SelectVCParts from 'app/components/Selects/VCParts';
import SelectLDAPUsers from 'app/components/Selects/ldapUsers';

const ModalTabs = ({ isLocal }) => {
  const selectParticipants = isLocal ? <SelectLDAPUsers /> : <SelectVCParts />;
  const tabs = [
    {
      title: 'Инфо',
      content: <MainInfo />,
      isShown: true,
    },
    {
      title: 'Участники',
      content: selectParticipants,
      isShown: true,
    },
  ];
  return <Tabs tabs={tabs} initial={tabs[0].title} />;
};

ModalTabs.propTypes = {
  isLocal: PropTypes.bool,
};

export default ModalTabs;
