import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import VideoConferences from 'app/pages/home/VideoConferences';
import LocalEvents from 'app/pages/home/LocalEvents';
import CreateEventModal from 'app/containers/CreateEventModal/index';
import Builder from './Builder';
import Dashboard from './Dashboard';
import DocsPage from './docs/DocsPage';
import { LayoutSplashScreen } from '../../../_metronic';

const GoogleMaterialPage = lazy(() =>
  import('./google-material/GoogleMaterialPage'),
);
const ReactBootstrapPage = lazy(() =>
  import('./react-bootstrap/ReactBootstrapPage'),
);

export default function HomePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <Redirect exact from="/" to="/video-conferences" />
        <Route path="/video-conferences" component={VideoConferences} />
        <Route path="/local-events" component={LocalEvents} />
        <Route path="/builder" component={Builder} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/google-material" component={GoogleMaterialPage} />
        <Route path="/react-bootstrap" component={ReactBootstrapPage} />
        <Route path="/docs" component={DocsPage} />
        <Redirect to="/error/error-v1" />
      </Switch>
      <CreateEventModal />
    </Suspense>
  );
}
