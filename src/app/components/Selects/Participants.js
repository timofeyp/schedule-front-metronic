import React, { useContext } from 'react';
import Select from 'app/components/Selects/Select';
import PropTypes from 'prop-types';
import { FormContext } from 'app/containers/CreateEventModal/Form';

const View = ({ onChange, options }) => {
  const { setFieldValue } = useContext(FormContext);
  return (
    <Select
      onChange={e => console.log(e)}
      options={options}
      placeholder="Выберите участников"
    />
  );
};

View.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array,
};

export default View;
