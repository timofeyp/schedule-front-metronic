import React from 'react';
import PropTypes from 'prop-types';
import Tabs from 'app/components/Tabs';
import MainDataForm from 'app/containers/CreateEventModal/MainDataForm';
import ParticipantsForm from 'app/containers/CreateEventModal/ParticipantsForm';

const ModalTabs = ({ setFieldValue }) => {
  const tabs = [
    {
      title: 'Инфо',
      content: <MainDataForm setFieldValue={setFieldValue} />,
      isShown: true,
    },
    {
      title: 'Участники',
      content: <ParticipantsForm />,
      isShown: true,
    },
  ];
  return <Tabs tabs={tabs} initial={tabs[0].title} />;
};

ModalTabs.propTypes = {
  setFieldValue: PropTypes.func,
};

export default ModalTabs;
