import React from 'react';
import PropTypes from 'prop-types';
import Tabs from 'app/components/Tabs';
import MainInfo from 'app/containers/CreateEventModal/MainInfo';
import Participants from 'app/containers/CreateEventModal/Participants';

const ModalTabs = ({ isLocal, setFieldValue }) => {
  const tabs = [
    {
      title: 'Инфо',
      content: <MainInfo setFieldValue={setFieldValue} />,
      isShown: true,
    },
    {
      title: 'Участники',
      content: <Participants isLocal={isLocal} />,
      isShown: true,
    },
  ];
  return <Tabs tabs={tabs} initial={tabs[0].title} />;
};

ModalTabs.propTypes = {
  isLocal: PropTypes.bool,
  setFieldValue: PropTypes.func,
};

export default ModalTabs;
