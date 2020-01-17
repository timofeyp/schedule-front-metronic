import styled, { keyframes } from 'styled-components';
import { Alert } from 'react-bootstrap';

export const alertKeyframes = keyframes`
  0% {
    opacity: 0; 
  }
  20% { 
    opacity: 0.8;
  }
  60% {
    opacity: 0.8;
  }
   100% {
    opacity: 0;
  }
`;

export const StyledAlert = styled(Alert)`
  position: fixed !important;
  bottom: ${({ index }) => index * 55 + 20}px;
  right: 5%;
  animation: ${alertKeyframes} 10s ease-in;
  animation-fill-mode: forwards;
`;
