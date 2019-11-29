import styled from 'styled-components';
import { Table, Card } from 'reactstrap';
import { initLayoutConfig } from '_metronic/layout/LayoutConfig';

export const DayTable = styled(Table)`
  table-layout: fixed;
  color: ${initLayoutConfig.colors.base.shape[3]} !important;
  & thead > tr > th {
    border-bottom: 0 !important;
  }
  & tbody > tr > th,
  td {
    border-top: 0 !important;
  }
  & tbody > tr {
    & :last-child {
      border-radius: 0 4px 4px 0;
    }
    & :first-child {
      border-radius: 4px 0 0 4px;
    }
  }
  & tbody > tr:hover {
    color: ${initLayoutConfig.colors.state.info} !important;
  }
`;

export const DayCard = styled(Card)`
  border: 0;
  margin: 10px;
  padding: 40px;
`;

export const DayHeader = styled.h4`
  color: '#646c9a94';
`;

export const TableTh = styled.th`
  width: ${props => props.width};
  text-align: ${props => props.textAlign};
`;
