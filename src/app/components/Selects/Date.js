import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FormControl, InputGroup } from 'react-bootstrap';
import moment from 'moment';
import ru from 'date-fns/locale/ru';
import { StyledDatePicker } from 'app/components/Selects/styles';
registerLocale('ru', ru);

const CustomInput = React.forwardRef(({ label, value, onClick }, ref) => (
  <InputGroup>
    <InputGroup.Prepend>
      <InputGroup.Text>{label}</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      readOnly
      value={value}
      placeholder={value}
      ref={ref}
      onClick={onClick}
    />
  </InputGroup>
));

CustomInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
};

const Date = ({ label, isTime, isFrom, field, setFieldValue }) => {
  let time = moment()
    .minutes(0)
    .seconds(0)
    .milliseconds(0);
  if (!isTime) time = time.startOf('day');
  if (isTime) time = time.add(isFrom ? 2 : 4, 'hours');
  time = time.toDate();
  const [value, changeValue] = useState(time);
  useEffect(() => {
    setFieldValue(field, value);
  }, [setFieldValue, field, value]);

  const handleChangeDate = date => {
    changeValue(date);
    setFieldValue(field, value);
  };
  const dateFormat = isTime ? 'HH:mm' : 'dd-MM-yyyy';
  return (
    <StyledDatePicker
      locale="ru"
      selected={value}
      onChange={handleChangeDate}
      dropDownMode="select"
      customInput={<CustomInput label={label} />}
      dateFormat={dateFormat}
      type="text"
      showTimeSelect={isTime}
      showTimeSelectOnly={isTime}
      timeIntervals={15}
      timeCaption="Время"
    />
  );
};

Date.propTypes = {
  setFieldValue: PropTypes.func,
  field: PropTypes.string,
  isTime: PropTypes.bool,
  isFrom: PropTypes.bool,
  label: PropTypes.string,
};

export default Date;
