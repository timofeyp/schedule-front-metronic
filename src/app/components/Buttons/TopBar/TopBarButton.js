import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { initLayoutConfig } from '_metronic/layout/LayoutConfig';

const TopBarButton = ({ children, to, handleClick, tipText }) => {
  const {
    state: { primary },
    headerText,
  } = initLayoutConfig.colors;
  const color = to ? headerText : primary;
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="quick-panel-tooltip">{tipText}</Tooltip>}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        onClick={handleClick}
        className="kt-header__topbar-item kt-header__topbar-item--quick-panel"
        data-toggle="kt-tooltip"
        data-placement="right"
      >
        <span
          className="kt-header__topbar-icon"
          id="kt_quick_panel_toggler_btn"
        >
          <Link className="align-self-center" to={to || '#'}>
            <span style={{ color }}> {children}</span>
          </Link>
        </span>
      </div>
    </OverlayTrigger>
  );
};

TopBarButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  to: PropTypes.string,
  handleClick: PropTypes.func,
  tipText: PropTypes.string,
};

export default TopBarButton;
