import styled from 'styled-components';
import ContentEditable from 'react-contenteditable';
import { Form } from 'react-bootstrap';

export const StyledContentEditable = styled(ContentEditable)`
  outline: 0px solid transparent;
  cursor: text;
  text-align: end;
`;

export const StyledInput = styled(Form.Control)`
  &:hover {
    border-color: #6cace4;
  }
`;
