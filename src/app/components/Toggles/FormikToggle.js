import React from 'react';
import Toggle from 'app/components/Toggles/Toggle';
import PropTypes from 'prop-types';

const FormikToggle = ({ text, id, field, ...props }) => (
  <Toggle text={text} id={id} checked={field.value} {...field} {...props} />
);
FormikToggle.propTypes = {
  text: PropTypes.string,
  id: PropTypes.string,
  field: PropTypes.object,
};

export default FormikToggle;
