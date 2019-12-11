import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ScheduleDay from 'app/containers/ScheduleDay';
import { connect } from 'react-redux';
import {
  fetchVCPartsRoutine,
  fetchSelectedVCPartsRoutine,
} from 'app/store/ducks/vcparts.duck';
import { fetchCurrentWeekEventsRoutine } from 'app/store/ducks/schedule.duck';
import { isEmpty } from 'lodash';
import InfoModal from 'app/containers/EventInfoModal';
import ReactToPrint from 'react-to-print';
import Printable from 'app/components/Printable';
import { StyledPrinterIcon } from 'app/containers/Schedule/styles';
import Filter from 'app/containers/Filter';

export const getSelects = () => {
  const defaultValues = localStorage.getItem('selectValues')
    ? JSON.parse(localStorage.getItem('selectValues'))
    : [];
  if (defaultValues && !isEmpty(defaultValues)) {
    return JSON.parse(localStorage.getItem('selectValues')).map(
      item => item.value,
    );
  }
  return [];
};

const Schedule = ({
  currentWeekEvents,
  fetchVCParts,
  fetchSelectedVCParts,
  fetchEvents,
  profile: { isAdmin },
}) => {
  useEffect(() => {
    fetchVCParts();
    fetchSelectedVCParts();
    fetchEvents();
  }, [fetchEvents, fetchSelectedVCParts, fetchVCParts]);
  const [isInfoModalOpen, toggleInfoModalOpen] = useState(false);
  const toggleHandler = () => toggleInfoModalOpen(!isInfoModalOpen);

  if (!isEmpty(currentWeekEvents)) {
    // eslint-disable-next-line no-unused-vars
    const componentRefs = currentWeekEvents.map(() => React.createRef());
    return (
      <div className="container__wrap">
        {currentWeekEvents.map((event, i) => (
          <Printable key={i} ref={componentRefs[i]}>
            <ScheduleDay
              eventData={event}
              dayId={i}
              toggleHandler={toggleHandler}
            >
              <ReactToPrint
                trigger={() => <StyledPrinterIcon />}
                content={() => componentRefs[i].current}
              />
            </ScheduleDay>
          </Printable>
        ))}
        <InfoModal isOpen={isInfoModalOpen} toggleHandler={toggleHandler} />
      </div>
    );
  }
  return <div>NULL</div>;
};

Schedule.propTypes = {
  currentWeekEvents: PropTypes.array,
  fetchVCParts: PropTypes.func,
  fetchSelectedVCParts: PropTypes.func,
  fetchEvents: PropTypes.func,
  profile: PropTypes.object,
};

const mapStateToProps = store => ({
  currentWeekEvents: store.schedule.currentWeekEvents,
  profile: store.session.profile,
});

const mapDispatchToProps = {
  fetchVCParts: fetchVCPartsRoutine.trigger,
  fetchSelectedVCParts: fetchSelectedVCPartsRoutine.trigger,
  fetchEvents: fetchCurrentWeekEventsRoutine.trigger,
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
