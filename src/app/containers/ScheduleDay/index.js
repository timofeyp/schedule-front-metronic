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
  updateEventRoutine,
} from 'app/store/ducks/event.duck';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

const ScheduleDay = ({
  defaultFilter,
  events,
  dayTitle,
  toggleHandler,
  fetchEvent,
  children,
  updateRoomEvent,
  dayId,
  isParticipantsInfo,
  ...props
}) => {
  const sortFunc = (a, b) => {
    const aStartString = a.timeStart.replace(':', '');
    const bStartString = b.timeStart.replace(':', '');
    const aEndString = a.timeEnd.replace(':', '');
    const bEndString = b.timeEnd.replace(':', '');
    const compareStart =
      parseInt(aStartString, 10) - parseInt(bStartString, 10);
    const compareEnd = parseInt(aEndString, 10) - parseInt(bEndString, 10);
    const compareNames = a.eventName.length - b.eventName.length;
    return compareStart || compareEnd || compareNames;
  };
  const eventsSorted = [...events].sort(sortFunc);
  const eventClickHandler = id => {
    toggleHandler();
    fetchEvent(id);
  };
  const filterNames = !isEmpty(defaultFilter)
    ? defaultFilter.map(event => event.label).join(', ')
    : null;

  const participantsInfo = filterNames
    ? `Отображены мероприятия с участием следующих предприятий: ${filterNames}`
    : 'Отображены мероприятия с участием всех предприятий';

  return (
    <Container className="mb-10">
      <Row className="justify-content-md-center">
        <Col>
          <DayCard>
            <DayHeader>
              <p className="text-center"> {dayTitle}</p>
              {isParticipantsInfo && (
                <p className="text-center">{participantsInfo}</p>
              )}
            </DayHeader>
            <Row className="p-2">
              <Col xs={1}>#</Col>
              <Col xs={7}>Название</Col>
              <Col xs={2} className="text-nowrap text-right">
                Зал/Статус
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
  events: PropTypes.array,
  toggleHandler: PropTypes.func,
  fetchEvent: PropTypes.func,
  children: PropTypes.object,
  updateRoomEvent: PropTypes.func,
  dayId: PropTypes.number,
  defaultFilter: PropTypes.array,
  isParticipantsInfo: PropTypes.bool,
  dayTitle: PropTypes.string,
};

const mapStateToProps = store => ({
  defaultFilter: store.settings.filter,
});

const mapDispatchToProps = {
  fetchEvent: fetchEventRoutine.trigger,
  updateRoomEvent: updateEventRoutine.trigger,
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  ScheduleDay,
);
