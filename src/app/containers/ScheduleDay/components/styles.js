import styled from 'styled-components';
import { Card, Row } from 'reactstrap';
import EventRow from 'app/containers/ScheduleDay/components/EventRow';
import { initLayoutConfig } from '_metronic/layout/LayoutConfig';

export const DayTable = styled.div`
  .event-row:nth-child(odd) {
    background-color: #4d59950f;
  }
`;

export const DayCard = styled(Card)`
  border: 0;
  margin: 10px;
  padding: 40px;
`;

export const DayHeader = styled.h5`
  color: ${initLayoutConfig.colors.base.shape[2]} !important;
`;

export const StyledEventRow = styled(EventRow)`
  border-radius: 4px !important;
  background-color: red !important;
  margin: 10px;
  padding: 40px;
`;
