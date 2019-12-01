import styled from 'styled-components';
import { Nav } from 'react-bootstrap';

export const StyledNavLink = styled(Nav.Link)`
  background: ${props => (props.active ? '#4d59950f' : 'unset')} !important;
  color: ${props => (props.active ? '#4596d1' : '#6c7293')} !important;
`;

export const StyledNavItem = styled(Nav.Item)`
  width: 100%;
  & :hover {
    background-color: #f8fafb !important;
  }
`;
