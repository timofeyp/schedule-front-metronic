import styled from 'styled-components';
import { Nav } from 'react-bootstrap';

export const StyledNavLink = styled(Nav.Link)`
  background-color: ${props => (props.active ? 'rgba(77, 89, 149, 0.06)' : 'unset')} !important;
  color: ${props => (props.active ? '#4596d1' : '#6c7293')} !important;
`;

export const StyledNavItem = styled(Nav.Item)`
  width: 100%;
  & :hover {
    background-color: #f8fafb !important;
  }
  margin: 0 !important;
`;
