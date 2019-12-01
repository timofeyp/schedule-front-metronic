import React from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'react-bootstrap';
import {
  DayTable,
  DayCard,
  DayHeader,
  TableTh,
} from 'app/containers/ScheduleDay/components/styles';

import {
  fetchEventRoutine,
  debouncedUpdateEventRoutine,
} from 'app/store/ducks/event.duck';
import { compose } from 'redux';
import { connect } from 'react-redux';
import EventRow from 'app/containers/ScheduleDay/components/EventRow';

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
        <Col md={12} lg={12} xl={10}>
          <DayCard>
            <DayHeader>{eventData._id}</DayHeader>
            <DayTable responsive hover striped>
              <thead>
                <tr>
                  <TableTh width="2em" textAlign="start">
                    #
                  </TableTh>
                  <th>Название</th>
                  <th style={{ width: '8em', textAlign: 'end' }}>Зал</th>
                  <th style={{ width: '8em', textAlign: 'end' }}>Время</th>
                </tr>
              </thead>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
              <tbody>
                {eventsSorted.map((event, i) => (
                  <EventRow
                    key={event._id}
                    eventClickHandler={eventClickHandler}
                    eventRoomChangeHandler={updateRoomEvent}
                    event={event}
                    num={i}
                    {...props}
                  />
                ))}
              </tbody>
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
