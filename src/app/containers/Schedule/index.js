import React from 'react';
import PropTypes from 'prop-types';
import ScheduleDay from 'app/containers/ScheduleDay';
import { connect } from 'react-redux';
import {
  fetchVCPartsRoutine,
  fetchSelectedVCPartsRoutine,
} from 'app/store/ducks/vcparts.duck';
import { fetchEventsRoutine } from 'app/store/ducks/schedule.duck';
import { isEmpty } from 'lodash';
import InfoModal from 'app/containers/EventInfoModal';
import ReactToPrint from 'react-to-print';
import Printable from 'app/components/Printable';
import { StyledPrinterIcon } from 'app/containers/Schedule/styles';
import AnimateLoading from 'app/partials/layout/AnimateLoading';
import useHooks from 'app/containers/Schedule/hooks';

const Schedule = ({
  concernEvents,
  localEvents,
  fetchVCParts,
  fetchSelectedVCParts,
  fetchEvents,
  isParticipantsInfo,
  isConcern,
  isLocal,
}) => {
  const events = isConcern ? concernEvents : localEvents;
  const { isInfoModalOpen, toggleInfoModalOpen, sortedEvents } = useHooks({
    fetchEvents,
    fetchSelectedVCParts,
    fetchVCParts,
    isLocal,
    isConcern,
    events,
  });
  const toggleHandler = () => toggleInfoModalOpen(!isInfoModalOpen);

  if (!isEmpty(sortedEvents)) {
    // eslint-disable-next-line no-unused-vars
    const componentRefs = Object.keys(sortedEvents).map(() =>
      React.createRef(),
    );
    return (
      <div className="container__wrap">
        {Object.keys(sortedEvents).map((day, i) => (
          <Printable key={i} ref={componentRefs[i]}>
            <ScheduleDay
              events={sortedEvents[day]}
              dayTitle={day}
              dayId={i}
              toggleHandler={toggleHandler}
              isParticipantsInfo={isParticipantsInfo}
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
  return <AnimateLoading />;
};

Schedule.propTypes = {
  concernEvents: PropTypes.array,
  localEvents: PropTypes.array,
  fetchVCParts: PropTypes.func,
  fetchSelectedVCParts: PropTypes.func,
  fetchEvents: PropTypes.func,
  isParticipantsInfo: PropTypes.bool,
  isConcern: PropTypes.bool,
  isLocal: PropTypes.bool,
};

const mapStateToProps = store => ({
  concernEvents: store.schedule.concernEvents,
  localEvents: store.schedule.localEvents,
});

const mapDispatchToProps = {
  fetchVCParts: fetchVCPartsRoutine.trigger,
  fetchSelectedVCParts: fetchSelectedVCPartsRoutine.trigger,
  fetchEvents: fetchEventsRoutine.trigger,
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
