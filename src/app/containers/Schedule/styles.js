import styled from 'styled-components';
import PrinterIcon from 'mdi-react/PrinterIcon';
import React from 'react';

export const StyledPrinterIcon = styled(
  React.forwardRef((props, ref) => <PrinterIcon {...props} />),
)`
  cursor: pointer;
  color: #6c757d9e;
`;
