import React from 'react';
import PropTypes from 'prop-types';
import { TableInput } from 'app/components/Fields/styles';

const View = ({ _id, ...props }) => (
  <TableInput name={_id} id="room" type="text" maxLength="14" {...props} />
);

View.propTypes = {
  _id: PropTypes.string,
  num: PropTypes.number,
};

export default View;
