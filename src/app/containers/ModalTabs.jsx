import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Button,
} from 'reactstrap';
import classnames from 'classnames';
import Participants from 'app/components/Participants';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { confirmLocalEventRoutine } from 'app/store/ducks/event.duck';
import ToggleEventVisibility from 'app/containers/EventInfoModal/ToggleEventVisibility';
import ToggleEventCanceled from 'app/containers/EventInfoModal/ToggleEventCanceled';
import { isEmpty } from 'lodash';

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
  const [activeTab, toggleTab] = useState(
    chairman || responsibleDisplayname || responsibleDept || room ? '1' : '3',
  );

  const toggle = tab => {
    if (activeTab !== tab) {
      toggleTab(tab);
    }
  };

  const handleConfirm = () => {
    confirmLocalEvent(id);
  };

  return (
    <Col md={12} lg={12} xs={12}>
      <Card>
        <CardBody>
          <div className="tabs tabs--vertical tabs--vertical-colored">
            <div className="tabs__wrap">
              <Nav tabs>
                {(chairman ||
                  responsibleDisplayname ||
                  responsibleDept ||
                  room) && (
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '1' })}
                      onClick={() => {
                        toggle('1');
                      }}
                    >
                      Инфо
                    </NavLink>
                  </NavItem>
                )}
                {!isEmpty(VCParts) && (
                  <NavItem className="no-wrap">
                    <NavLink
                      className={classnames({ active: activeTab === '2' })}
                      onClick={() => {
                        toggle('2');
                      }}
                    >
                      Участники
                    </NavLink>
                  </NavItem>
                )}
                {isAdmin && (
                  <NavItem className="no-wrap">
                    <NavLink
                      className={classnames({ active: activeTab === '3' })}
                      onClick={() => {
                        toggle('3');
                      }}
                    >
                      Настройки
                    </NavLink>
                  </NavItem>
                )}
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  {chairman && (
                    <h4 className="subhead mb-1">
                      Председатель:{' '}
                      <span className="dark-text">{chairman}</span>
                    </h4>
                  )}
                  {responsibleDisplayname && (
                    <h4 className="subhead mb-1">
                      Ответственный:{' '}
                      <span className="dark-text">
                        {responsibleDisplayname}
                      </span>
                    </h4>
                  )}
                  {responsibleDept && (
                    <h4 className="subhead mb-1">
                      Департамент:{' '}
                      <span className="dark-text">{responsibleDept}</span>
                    </h4>
                  )}
                  {room && (
                    <h4 className="subhead mb-1">
                      Студия:
                      <span className="dark-text">
                        {room.location_name || ''}
                      </span>
                    </h4>
                  )}
                </TabPane>
                {VCParts && (
                  <TabPane tabId="2">
                    <Participants VCParts={VCParts} />
                  </TabPane>
                )}
                <TabPane tabId="3">
                  <ToggleEventVisibility />
                  <ToggleEventCanceled />
                </TabPane>
              </TabContent>
            </div>
          </div>
          <div className="text-center">
            <Button
              disabled={!isAuth || confirmed}
              onClick={handleConfirm}
              className="square"
              size="sm"
              color="success"
            >
              Подтвердить участие в конференции
            </Button>
          </div>
        </CardBody>
      </Card>
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
