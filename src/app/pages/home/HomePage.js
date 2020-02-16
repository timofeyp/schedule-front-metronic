import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import VideoConferences from 'app/pages/home/VideoConferences';
import LocalEvents from 'app/pages/home/LocalEvents';
import CreateEventModal from 'app/containers/CreateEventModal/index';
import { LayoutSplashScreen } from '../../../_metronic';

export default function HomePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <Redirect exact from="/" to="/video-conferences" />
        <Route path="/video-conferences" component={VideoConferences} />
        <Route path="/local-events" component={LocalEvents} />
        <Redirect to="/error/error-v1" />
      </Switch>
      <CreateEventModal />
    </Suspense>
  );
}
