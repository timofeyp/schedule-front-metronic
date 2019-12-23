import styled from 'styled-components';
import TimePicker from 'rc-time-picker';

const StyledTimePicker = styled(TimePicker)`
  cursor: pointer;
  width: 5em;
  background: #6cace4;
  border-radius: 5px;
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
    cursor: pointer;
    border: 0;
    font-family: sans-serif;
    font-size: 12px;
    font-stretch: 100%;
    font-style: normal;
    font-variant-caps: normal;
    font-variant-east-asian: normal;
    font-variant-ligatures: normal;
    font-variant-numeric: normal;
    color: white;
    text-align: center;

    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
`;

const StyledDataPicker = styled.div`
  cursor: pointer;
  text-align: center;
  color: white;
  background-color: #6cace4;
  border-radius: 5px;
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
  font-size: 12px;
  font-stretch: 100%;
  font-style: normal;
  font-variant-caps: normal;
  font-variant-east-asian: normal;
  font-variant-ligatures: normal;
  font-variant-numeric: normal;
`;

export { StyledTimePicker, StyledDataPicker };
