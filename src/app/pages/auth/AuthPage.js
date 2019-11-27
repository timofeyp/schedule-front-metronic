import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Registration from './Registration';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import '../../../_metronic/_assets/sass/pages/login/login-1.scss';

export default function AuthPage() {
  return (
    <>
      <div className="kt-grid kt-grid--ver kt-grid--root">
        <div
          id="kt_login"
          className="kt-grid kt-grid--hor kt-grid--root  kt-login kt-login--v1"
        >
          <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--desktop kt-grid--ver-desktop kt-grid--hor-tablet-and-mobile">
            <div className="kt-grid__item kt-grid__item--fluid  kt-grid__item--order-tablet-and-mobile-1  kt-login__wrapper">
              <Switch>
                <Redirect from="/auth" exact to="/auth/login" />

                <Route path="/auth/login" component={Login} />
                <Route path="/auth/registration" component={Registration} />
                <Route
                  path="/auth/forgot-password"
                  component={ForgotPassword}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
