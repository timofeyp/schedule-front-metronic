import styled from 'styled-components';
import PrinterIcon from 'mdi-react/PrinterIcon';
import React from 'react';
import { initLayoutConfig } from '_metronic/layout/LayoutConfig';

export const StyledPrinterIcon = styled(
  React.forwardRef((props, ref) => <PrinterIcon {...props} />),
)`
  cursor: pointer;
  color: ${initLayoutConfig.colors.base.shape[2]};
  :hover {
    color: ${initLayoutConfig.colors.state.info} !important;
  }
`;
