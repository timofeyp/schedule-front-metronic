import React from 'react';
import { Col, Button } from 'react-bootstrap';
import Participants from 'app/components/Participants';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { confirmLocalEventRoutine } from 'app/store/ducks/event.duck';
import Tabs from 'app/components/Tabs';
import InfoTab from 'app/containers/EventInfoModal/InfoTab';
import OptionsTab from 'app/containers/EventInfoModal/OptionsTab';

const ModalTabs = ({
  data: {
    _id: id,
    chairman,
    responsibleDisplayname,
    responsibleDept,
    room,
    VCParts,
    confirmed,
  },
  confirmLocalEvent,
  isAuth,
}) => {
  const isAdmin = useSelector(state => state.session.profile.isAdmin);

  const handleConfirm = () => {
    confirmLocalEvent(id);
  };

  const isInfo = !!(
    chairman ||
    responsibleDisplayname ||
    responsibleDept ||
    room
  );

  const tabs = [
    {
      title: 'Инфо',
      content: (
        <InfoTab
          chairman={chairman}
          responsibleDisplayname={responsibleDisplayname}
          responsibleDept={responsibleDept}
          room={room}
        />
      ),
      isShown: isInfo,
    },
    {
      title: 'Участники',
      content: <Participants VCParts={VCParts} />,
      isShown: !!VCParts,
    },
    {
      content: <OptionsTab />,
      title: 'Настройки',
      isShown: isAdmin,
    },
  ];

  const activeTab = tabs.find(tab => tab.isShown);

  return (
    <Col className="mt-2  mb-4" md={12} lg={12} xs={12}>
      <Tabs tabs={tabs} initial={activeTab.title} />
      {isAuth && (
        <div className="text-center">
          <Button
            disabled={!isAuth || confirmed}
            onClick={handleConfirm}
            size="sm"
            color="success"
          >
            {confirmed
              ? 'Вы подтвердили участие'
              : 'Подтвердить участие в конференции'}
          </Button>
        </div>
      )}
    </Col>
  );
};
const mapDispatchToProps = {
  confirmLocalEvent: confirmLocalEventRoutine.trigger,
};

const mapStateToProps = store => ({
  isAuth: store.session.isAuth,
});
ModalTabs.propTypes = {
  data: PropTypes.object,
  confirmLocalEvent: PropTypes.func,
  isAuth: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalTabs);
