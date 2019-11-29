import styled from 'styled-components';
import { Input } from 'reactstrap';

export const TableInput = styled(Input)`
  width: 120% !important;
  height: 1.5em !important;
  background-color: initial !important;
  border: hidden !important;
  border-radius: 4px !important;
  text-align: end;
  font-size: 13px !important;
  resize: horizontal;
`;

export const StyledInput = styled(Input)`
  &:hover {
    border-color: #6cace4;
  }
`;
