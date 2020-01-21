import React from 'react';
import { CircularProgress } from '@material-ui/core';

// eslint-disable-next-line react/prefer-stateless-function
class SplashScreen extends React.Component {
  render() {
    return (
      <>
        <div className="kt-splash-screen">
          <CircularProgress className="kt-splash-screen__spinner" />
        </div>
      </>
    );
  }
}

export default SplashScreen;
