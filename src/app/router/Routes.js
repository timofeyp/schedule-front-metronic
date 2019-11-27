/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/pages/auth/AuthPage`, `src/pages/home/HomePage`).
 */

import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { useLastLocation } from 'react-router-last-location';
import HomePage from 'app/pages/home/HomePage';
import AuthPage from 'app/pages/auth/AuthPage';
import ErrorsPage from 'app/pages/errors/ErrorsPage';
import LogoutPage from 'app/pages/auth/Logout';
import { LayoutContextProvider } from '_metronic';
import * as routerHelpers from 'app/router/RouterHelpers';

export const Routes = withRouter(({ Layout, history }) => {
  const lastLocation = useLastLocation();
  routerHelpers.saveLastLocation(lastLocation);
  const {
    isAuthorized,
    menuConfig: menuConfigData,
    userLastLocation,
  } = useSelector(
    ({ session, urls, builder: { menuConfig } }) => ({
      menuConfig,
      isAuthorized: session.auth,
      userLastLocation: routerHelpers.getLastLocation(),
    }),
    shallowEqual,
  );

  return (
    /* Create `LayoutContext` from current `history` and `menuConfig`. */
    <LayoutContextProvider history={history} menuConfig={menuConfigData}>
      <Switch>
        {!isAuthorized ? (
          /* Render auth page when user at `/auth` and not authorized. */
          <Route path="/auth/login" component={AuthPage} />
        ) : (
          /* Otherwise redirect to root page (`/`) */
          <Redirect from="/auth" to={userLastLocation} />
        )}

        <Route path="/error" component={ErrorsPage} />
        <Route path="/logout" component={LogoutPage} />

        {!isAuthorized ? (
          /* Redirect to `/auth` when user is not authorized */
          <Redirect to="/auth/login" />
        ) : (
          <Layout>
            <HomePage userLastLocation={userLastLocation} />
          </Layout>
        )}
      </Switch>
    </LayoutContextProvider>
  );
});
