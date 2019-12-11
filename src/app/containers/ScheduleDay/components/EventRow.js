import React from 'react';
import PropTypes from 'prop-types';
import Info from 'app/containers/ScheduleDay/components/Info';
import { useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import EditableTd from 'app/components/Fields/EditableTd';

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
  className,
}) => {
  const handleChangeRoom = e => {
    eventRoomChangeHandler({
      _id,
      localRoom: e.target.value,
    });
  };

  const isAdmin = useSelector(state => state.session.profile.isAdmin);
  const handleClick = e => {
    if (e.target.id !== 'localRoom') {
      eventClickHandler(_id);
    }
  };

  return (
    <div className={`event-row p-2 ${className}`}>
      <Row onClick={handleClick}>
        <Col xs={1} className="text-nowrap">
          {++num}
        </Col>
        <Col xs={8}>{eventName}</Col>
        <Col className="text-nowrap text-right" xs={1}>
          {isAdmin ? (
            <EditableTd innerText={localRoom} handleChange={handleChangeRoom} />
          ) : (
            localRoom || ''
          )}
        </Col>
        <Col xs={2} className="text-right">
          {`${timeStart} - ${timeEnd}`}
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 11, offset: 1 }}>
          <Info
            isCanceled={isCanceled}
            confirms={confirms}
            isHidden={isHidden}
          />
        </Col>
      </Row>
    </div>
  );
};

EventRow.propTypes = {
  event: PropTypes.object,
  eventRoomChangeHandler: PropTypes.func,
  eventClickHandler: PropTypes.func,
  num: PropTypes.number,
  className: PropTypes.string,
};

export default EventRow;
