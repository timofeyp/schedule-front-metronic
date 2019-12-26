import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyledTimePicker } from 'app/components/Selects/styles';
import moment from 'moment';

const TimePickerField = ({ isFrom, handleChange, is12HoursMode }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    handleChange(moment().format('HH:mm'));
  }, [handleChange]);
  const handleChangeTime = value => {
    handleChange(value.format('HH:mm'));
  };
  const name = isFrom ? 'from' : 'to';
  const setOpenFromPicker = e => setOpen(e.open);
  return (
    <StyledTimePicker
      hideDisabledOptions
      allowEmpty={false}
      defaultValue={moment()
        .add(2, 'hours')
        .minutes(0)}
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
  is12HoursMode: PropTypes.bool.isRequired,
  isFrom: PropTypes.bool,
};

export default TimePickerField;
