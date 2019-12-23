import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CreateEvent from 'app/components/Buttons/TopBar/CreateEvent';
import Login from 'app/components/Buttons/TopBar/Login';
import SearchDropdown from '../../../app/partials/layout/SearchDropdown';
import UserNotifications from '../../../app/partials/layout/UserNotifications';
import MyCart from '../../../app/partials/layout/MyCart';
import QuickActionsPanel from '../../../app/partials/layout/QuickActionsPanel';
import QuickPanelToggler from './QuickPanelToggle';
import LanguageSelector from '../../../app/partials/layout/LanguageSelector';
import { toAbsoluteUrl } from '../../utils/utils';

const Topbar = ({ isAuth }) => (
  <div className="kt-header__topbar">
    <SearchDropdown useSVG="true" />

    <UserNotifications
      bgImage={toAbsoluteUrl('/media/misc/bg-1.jpg')}
      pulse="true"
      pulseLight="false"
      skin="dark"
      iconType=""
      type="success"
      useSVG="true"
      dot="false"
      isHidden
    />

    <QuickActionsPanel
      bgImage={toAbsoluteUrl('/media/misc/bg-2.jpg')}
      skin="dark"
      iconType=""
      useSVG="true"
      gridNavSkin="light"
      isHidden
    />

    <MyCart
      iconType=""
      useSVG="true"
      bgImage={toAbsoluteUrl('/media/misc/bg-1.jpg')}
      isHidden
    />

    <QuickPanelToggler />

    <LanguageSelector isHidden iconType="" />

    <CreateEvent />

    <Login />
  </div>
);

Topbar.propTypes = {
  isAuth: PropTypes.bool,
};
const matStateToProps = store => ({
  isAuth: store.session.isAuth,
});

export default connect(matStateToProps, null)(Topbar);
