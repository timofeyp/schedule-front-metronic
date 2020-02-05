import { useEffect, useState, useMemo } from 'react';
import { isEmpty } from 'lodash';

const useHooks = ({
  fetchEvents,
  fetchSelectedVCParts,
  fetchVCParts,
  isLocal,
  isVideo,
  currentWeekEvents,
}) => {
  useEffect(() => {
    if (isVideo) {
      fetchVCParts();
      fetchSelectedVCParts();
    }
    fetchEvents({ isVideo, isLocal });
  }, [fetchEvents, fetchSelectedVCParts, fetchVCParts, isLocal, isVideo]);
  const sortedEvents = useMemo(() => {
    if (!isEmpty(currentWeekEvents)) {
      const sortedEventsAccumulator = {};
      currentWeekEvents.forEach(e => {
        if (!sortedEventsAccumulator[e.yearMonthDay]) {
          sortedEventsAccumulator[e.yearMonthDay] = [e];
        } else {
          sortedEventsAccumulator[e.yearMonthDay].push(e);
        }
      });
      return sortedEventsAccumulator;
    }
    return [];
  }, [currentWeekEvents]);

  const [isInfoModalOpen, toggleInfoModalOpen] = useState(false);

  return { sortedEvents, isInfoModalOpen, toggleInfoModalOpen };
};

export default useHooks;
