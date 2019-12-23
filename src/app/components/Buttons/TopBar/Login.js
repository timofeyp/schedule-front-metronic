import React from 'react';
import TopBarButton from 'app/components/Buttons/TopBar/TopBarButton';
import UserProfile from 'app/partials/layout/UserProfile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Login = ({ isAuth }) => {
  if (isAuth) return <UserProfile showAvatar showHi showBadge={false} />;
  return (
    <TopBarButton
      tipText="Выполнить вход под учетной записью домена"
      to="/auth/login"
    >
      Вход
    </TopBarButton>
  );
};

Login.propTypes = {
  isAuth: PropTypes.bool,
};
const matStateToProps = store => ({
  isAuth: store.session.isAuth,
});

export default connect(matStateToProps, null)(Login);
