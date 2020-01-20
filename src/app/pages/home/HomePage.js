import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Schedule from 'app/containers/Schedule';
import CreateEventModal from 'app/containers/CreateEventModal/index';
import { LayoutSplashScreen } from '../../../_metronic';

export default function HomePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <Redirect exact from="/" to="/schedule" />
        <Route path="/schedule" component={Schedule} />
        <Redirect to="/error/error-v1" />
      </Switch>
      <CreateEventModal />
    </Suspense>
  );
}
