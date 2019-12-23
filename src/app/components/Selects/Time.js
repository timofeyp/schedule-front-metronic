import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyledTimePicker } from 'app/components/Selects/styles';
import moment from 'moment';

const TimePickerField = ({ name, handleChange, is12HoursMode }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    handleChange(moment().format('HH:mm'));
  }, []);
  const handleChangeTime = value => {
    handleChange(value.format('HH:mm'));
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
      onChange={handleChangeTime}
      showSecond={false}
      use12Hours={is12HoursMode}
    />
  );
};

TimePickerField.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  is12HoursMode: PropTypes.bool.isRequired,
};

export default TimePickerField;
