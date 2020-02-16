import React from 'react';
import ToggleEventVisibility from 'app/components/Toggles/ToggleEventVisibility';
import ToggleEventCanceled from 'app/components/Toggles/ToggleEventCanceled';

const OptionsTab = () => (
  <>
    <ToggleEventVisibility />
    <ToggleEventCanceled />
  </>
);

export default OptionsTab;
