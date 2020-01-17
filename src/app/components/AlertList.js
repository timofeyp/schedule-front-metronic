import React from 'react';
import { StyledAlert } from 'app/components/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AlertList = ({ alerts }) =>
  alerts.map((alert, i) => (
    <StyledAlert key={i} index={i} variant={alert.variant}>
      {alert.text}
    </StyledAlert>
  ));

AlertList.propTypes = {
  alerts: PropTypes.array,
};

const mapStateToProps = store => ({
  alerts: store.alert.list,
});

export default connect(mapStateToProps, null)(AlertList);
