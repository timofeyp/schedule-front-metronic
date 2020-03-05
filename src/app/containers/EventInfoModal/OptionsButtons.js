import React from 'react';
import ToggleEventVisibility from 'app/components/Toggles/ToggleEventVisibility';
import ToggleEventCanceled from 'app/components/Toggles/ToggleEventCanceled';

const OptionsButtons = () => (
  <>
    <ToggleEventVisibility />
    <ToggleEventCanceled />
  </>
);

export default OptionsButtons;
