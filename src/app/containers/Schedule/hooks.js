import { useEffect, useState, useMemo } from 'react';
import { isEmpty } from 'lodash';

const useHooks = ({
  fetchEvents,
  fetchSelectedVCParts,
  fetchVCParts,
  isLocal,
  isConcern,
  events,
}) => {
  useEffect(() => {
    if (isConcern) {
      fetchVCParts();
      fetchSelectedVCParts();
    }
    fetchEvents({ isLocal, isConcern });
  }, [fetchEvents, fetchSelectedVCParts, fetchVCParts, isConcern, isLocal]);
  const sortedEvents = useMemo(() => {
    if (!isEmpty(events)) {
      const sortedEventsAccumulator = {};
      events.forEach(e => {
        if (!sortedEventsAccumulator[e.yearMonthDay]) {
          sortedEventsAccumulator[e.yearMonthDay] = [e];
        } else {
          sortedEventsAccumulator[e.yearMonthDay].push(e);
        }
      });
      return sortedEventsAccumulator;
    }
    return [];
  }, [events]);

  const [isInfoModalOpen, toggleInfoModalOpen] = useState(false);

  return { sortedEvents, isInfoModalOpen, toggleInfoModalOpen };
};

export default useHooks;
