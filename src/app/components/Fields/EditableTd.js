import React from 'react';
import PropTypes from 'prop-types';
import { StyledContentEditable } from 'app/components/Fields/styles';

const EditableTd = ({ handleChange, innerText }) => {
  const text = innerText || '';
  return (
    <StyledContentEditable
      html={text}
      disabled={false}
      onChange={handleChange}
      id="localRoom"
      tagName="div"
    />
  );
};

EditableTd.propTypes = {
  handleChange: PropTypes.func,
  innerText: PropTypes.string,
};

export default EditableTd;
