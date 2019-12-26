import styled from 'styled-components';
import TimePicker from 'rc-time-picker';
import DatePicker from 'react-datepicker';
import 'rc-time-picker/assets/index.css';

const StyledTimePicker = styled(TimePicker)`
  cursor: pointer;
  width: 5em;
  height: 100%;
  background: #4596d1;
  border-radius: 3.75px;
  display: flex !important;
  align-items: center;

  & .rc-time-picker-panel-select-option-selected {
    background-color: #edeffe;
    font-weight: normal;
  }

  & .rc-time-picker-clear,
  & .rc-time-picker-clear-icon:after {
    opacity: 0;
  }

  & .rc-time-picker-panel-select,
  & .rc-time-picker-input,
  & .rc-time-picker-panel-input {
    border: 0;
    cursor: pointer;
    background: #4596d1;
    font-stretch: 100%;
    font-style: normal;
    color: white;
    font-variant-caps: normal;
    font-variant-east-asian: normal;
    font-variant-ligatures: normal;
    font-variant-numeric: normal;
    text-align: center;

    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
`;

const StyledDatePicker = styled(DatePicker)`
  cursor: pointer;
`;

export { StyledTimePicker, StyledDatePicker };
