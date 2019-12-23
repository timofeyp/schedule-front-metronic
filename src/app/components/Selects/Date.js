import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import moment from 'moment';
import ru from 'date-fns/locale/ru';
import { StyledDataPicker } from 'app/components/Selects/styles';
registerLocale('ru', ru);

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <StyledDataPicker ref={ref} onClick={onClick}>
    {value}
  </StyledDataPicker>
));

CustomInput.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
};

const Date = () => {
  const [startDate, changeDate] = useState(moment().toDate());
  useEffect(() => {
    // onChange(startDate);
  }, []);
  const handleChange = date => {
    changeDate(date);
    // onChange(date);
  };

  return (
    <div className="date-picker">
      <DatePicker
        locale="ru"
        selected={startDate}
        onChange={handleChange}
        dropDownMode="select"
        customInput={<CustomInput />}
        dateFormat="dd/MM/yyyy"
      />
    </div>
  );
};

Date.propTypes = {
  input: PropTypes.object,
};

export default Date;
