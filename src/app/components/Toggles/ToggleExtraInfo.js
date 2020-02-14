import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleExtraInfoRoutine } from 'app/store/ducks/settings.duck';
import Toggle from 'app/components/Toggles/Toggle';

const ToggleExtraInfo = () => {
  const isExtraInfo = useSelector(state => state.settings.isExtraInfo);
  const isAdmin = useSelector(state => state.session.profile.isAdmin);
  const dispatch = useDispatch();
  const handleClick = () =>
    dispatch(toggleExtraInfoRoutine.trigger(!isExtraInfo));
  if (isAdmin) {
    return (
      <Toggle
        text="Доп. инфо"
        defaultChecked={isExtraInfo}
        handleClick={handleClick}
        id="extra_toggle"
      />
    );
  }
  return null;
};

export default ToggleExtraInfo;
