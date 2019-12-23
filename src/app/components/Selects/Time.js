import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyledTimePicker } from 'app/components/Selects/styles';
import moment from 'moment';

const TimePickerField = ({ name, onChange, timeMode }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    onChange(moment().format('HH:mm'));
  }, []);
  const handleChange = value => {
    onChange(value.format('HH:mm'));
  };
  const setOpenFromPicker = e => setOpen(e.open);
  return (
    <StyledTimePicker
      hideDisabledOptions
      allowEmpty={false}
      defaultValue={moment()}
      minuteStep={5}
      open={open}
      onOpen={setOpenFromPicker}
      onClose={setOpenFromPicker}
      name={name}
      onChange={handleChange}
      showSecond={false}
      use12Hours={timeMode}
    />
  );
};

const renderTimePickerField = props => {
  const { input, timeMode } = props;
  return <TimePickerField {...input} timeMode={timeMode} />;
};

renderTimePickerField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
  timeMode: PropTypes.bool,
};

renderTimePickerField.defaultProps = {
  timeMode: false,
};

TimePickerField.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  timeMode: PropTypes.bool.isRequired,
};

export default renderTimePickerField;
