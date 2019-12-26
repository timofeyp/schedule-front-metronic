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

const Date = ({ label, isTime, isFrom, field, handleChange }) => {
  const time = moment()
    .add(!isFrom ? 4 : 2, 'hours')
    .minutes(0)
    .toDate();
  const [value, changeValue] = useState(time);
  useEffect(() => {
    handleChange(field, value);
  }, [handleChange, field, value]);
  const handleChangeDate = date => {
    changeValue(date);
    handleChange(field, value);
  };
  const dateFormat = isTime ? 'HH:mm' : 'dd/MM/yyyy';

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
  handleChange: PropTypes.func,
  field: PropTypes.string,
  isTime: PropTypes.bool,
  isFrom: PropTypes.bool,
  label: PropTypes.string,
};

export default Date;
