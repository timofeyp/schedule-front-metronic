/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import HeaderDropdownToggle from '../content/CustomDropdowns/HeaderDropdownToggle';

const UserProfile = ({ user, showHi, showBadge }) => (
  <Dropdown
    className="kt-header__topbar-item kt-header__topbar-item--user"
    drop="down"
    alignRight
  >
    <Dropdown.Toggle
      as={HeaderDropdownToggle}
      id="dropdown-toggle-user-profile"
    >
      <div className="kt-header__topbar-user">
        {showHi && (
          <span className="kt-header__topbar-username kt-hidden-mobile">
            {user}
          </span>
        )}
      </div>
    </Dropdown.Toggle>
    <Dropdown.Menu className="dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xs">
      {/** ClassName should be 'dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl' */}
      <div className="kt-notification">
        <div className="kt-notification__custom">
          <Link
            to="/logout"
            block
            className="btn btn-label-brand btn-sm btn-bold btn-block"
          >
            Выход
          </Link>
        </div>
      </div>
    </Dropdown.Menu>
  </Dropdown>
);

UserProfile.propTypes = {
  user: PropTypes.string,
  showHi: PropTypes.bool,
  showBadge: PropTypes.bool,
};

const mapStateToProps = ({ session: { profile } }) => ({
  user: profile.name,
});

export default connect(mapStateToProps)(UserProfile);
