import React from 'react';
import ToggleEventVisibility from 'app/components/Togglers/ToggleEventVisibility';
import ToggleEventCanceled from 'app/components/Togglers/ToggleEventCanceled';

const OptionsTab = () => (
  <>
    <ToggleEventVisibility />
    <ToggleEventCanceled />
  </>
);

export default OptionsTab;
