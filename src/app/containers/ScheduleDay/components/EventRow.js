import React from 'react';
import PropTypes from 'prop-types';
import Info from 'app/containers/ScheduleDay/components/Info';
import { useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import EditableTd from 'app/components/Fields/EditableTd';
import InfoWarning from 'app/components/Buttons/InfoWarning';
import { isEmpty } from 'lodash';

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

  const roomTag = () =>
    isAdmin ? (
      <EditableTd innerText={localRoom} handleChange={handleChangeRoom} />
    ) : (
      localRoom
    );
  const isInfo = isCanceled || !isEmpty(confirms) || isHidden;
  const infoMargin = isInfo ? 'mb-2' : '';
  return (
    <div className={`event-row p-2 ${className}`}>
      <Row className={infoMargin} onClick={handleClick}>
        <Col xs={1} className="text-nowrap">
          {++num}
        </Col>
        <Col xs={8}>{eventName}</Col>
        <Col className="text-nowrap text-right" xs={1}>
          {isCanceled ? (
            <InfoWarning active disabled variant="danger">
              Отмена
            </InfoWarning>
          ) : (
            roomTag()
          )}
        </Col>
        <Col xs={2} className="text-right">
          {`${timeStart} - ${timeEnd}`}
        </Col>
      </Row>
      <Info
        isInfo={isInfo}
        isCanceled={isCanceled}
        confirms={confirms}
        isHidden={isHidden}
        handleClick={handleClick}
      />
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
