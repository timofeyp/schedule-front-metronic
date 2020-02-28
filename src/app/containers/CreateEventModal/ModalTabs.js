import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Tabs from 'app/components/Tabs';
import MainInfo from 'app/containers/CreateEventModal/MainInfo';
import Participants from 'app/containers/CreateEventModal/Participants';
import { FormContext } from 'app/containers/CreateEventModal/Form';

const ModalTabs = ({ isLocal }) => {
  const { setFieldValue } = useContext(FormContext);
  const tabs = [
    {
      title: 'Инфо',
      content: <MainInfo setFieldValue={setFieldValue} />,
      isShown: true,
    },
    {
      title: 'Участники',
      content: <Participants isLocal={isLocal} setFieldValue={setFieldValue} />,
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
