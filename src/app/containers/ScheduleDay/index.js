import React from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'react-bootstrap';
import {
  DayTable,
  DayCard,
  DayHeader,
  StyledEventRow,
} from 'app/containers/ScheduleDay/components/styles';

import {
  fetchEventRoutine,
  debouncedUpdateEventRoutine,
} from 'app/store/ducks/event.duck';
import { compose } from 'redux';
import { connect } from 'react-redux';

const ScheduleDay = ({
  eventData,
  toggleHandler,
  fetchEvent,
  children,
  updateRoomEvent,
  dayId,
  ...props
}) => {
  const { events } = eventData;
  const sortFunc = (a, b) => {
    const aStartString = a.timeStart.replace(':', '');
    const bStartString = b.timeStart.replace(':', '');
    const aEndString = a.timeEnd.replace(':', '');
    const bEndString = b.timeEnd.replace(':', '');
    return (
      parseInt(aStartString, 10) - parseInt(bStartString, 10) ||
      parseInt(aEndString, 10) - parseInt(bEndString, 10) ||
      a._id - b._id
    );
  };
  const eventsSorted = [...events].sort(sortFunc);
  const eventClickHandler = id => {
    toggleHandler();
    fetchEvent(id);
  };

  return (
    <Container className="mb-10">
      <Row className="justify-content-md-center">
        <Col>
          <DayCard>
            <DayHeader>{eventData._id}</DayHeader>
            <Row className="p-2">
              <Col xs={1}>#</Col>
              <Col xs={8}>Название</Col>
              <Col xs={1} className="text-nowrap text-right">
                Зал
              </Col>
              <Col xs={2} className="text-nowrap text-right">
                Время
              </Col>
            </Row>
            <DayTable>
              {eventsSorted.map((event, i) => (
                <StyledEventRow
                  className="event-row"
                  key={event._id}
                  eventClickHandler={eventClickHandler}
                  eventRoomChangeHandler={updateRoomEvent}
                  event={event}
                  num={i}
                  {...props}
                />
              ))}
            </DayTable>
            <Row className="mt-1 justify-content-center">{children}</Row>
          </DayCard>
        </Col>
      </Row>
    </Container>
  );
};

ScheduleDay.propTypes = {
  eventData: PropTypes.object,
  toggleHandler: PropTypes.func,
  fetchEvent: PropTypes.func,
  children: PropTypes.object,
  updateRoomEvent: PropTypes.func,
  dayId: PropTypes.number,
};

const mapDispatchToProps = {
  fetchEvent: fetchEventRoutine.trigger,
  updateRoomEvent: debouncedUpdateEventRoutine.trigger,
};

export default compose(connect(null, mapDispatchToProps))(ScheduleDay);
