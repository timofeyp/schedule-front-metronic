import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import Info from 'app/containers/ScheduleDay/components/Info';
import { useSelector } from 'react-redux';
import { Container, Col, Row } from 'react-bootstrap';
import { CancelTag } from 'app/components/Buttons/styles';
import EditableTd from 'app/components/Fields/EditableTd';
import { StyledEventRow } from 'app/containers/ScheduleDay/components/styles';

const EventRow = ({
  event: {
    isHidden,
    isCanceled,
    confirms,
    _id,
    eventName,
    timeStart,
    timeEnd,
    localRoom,
  },
  eventClickHandler,
  eventRoomChangeHandler,
  num,
}) => {
  const handleChangeRoom = e => {
    eventRoomChangeHandler({
      _id,
      localRoom: e.target.value,
    });
  };
  const settings = useSelector(state => state.settings);
  const isAdmin = useSelector(state => state.session.profile.isAdmin);
  const isInfo =
    (isHidden || (isCanceled && isAdmin) || !isEmpty(confirms)) &&
    settings &&
    settings.isExtraInfo;
  const handleClick = e => {
    if (e.target.id !== 'localRoom') {
      eventClickHandler(_id);
    }
  };

  return (
    <Row className="event-row">
      <Col xs={1} className="text-nowrap">
        {++num}
      </Col>
      <Col xs={8}>
        {eventName}
        <Info isHidden={isHidden} />
        {isCanceled && !isAdmin && (
          <CancelTag disabled className="text-danger">
            Мероприятие отменено
          </CancelTag>
        )}
      </Col>
      <Col className="text-nowrap text-right" xs={1}>
        {isAdmin ? (
          <EditableTd innerText={localRoom} handleChange={handleChangeRoom} />
        ) : (
          { localRoom }
        )}
      </Col>
      <Col xs={2} className="text-right">
        {`${timeStart} - ${timeEnd}`}
      </Col>
    </Row>
  );
};

EventRow.propTypes = {
  event: PropTypes.object,
  eventRoomChangeHandler: PropTypes.func,
  eventClickHandler: PropTypes.func,
  num: PropTypes.number,
};

export default EventRow;
