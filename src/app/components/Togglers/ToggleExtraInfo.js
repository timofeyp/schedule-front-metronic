import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleExtraInfoRoutine } from 'app/store/ducks/settings.duck';
import Toggler from 'app/components/Togglers/Toggler';

const ToggleExtraInfo = () => {
  const isExtraInfo = useSelector(state => state.settings.isExtraInfo);
  const dispatch = useDispatch();
  const handleClick = () =>
    dispatch(toggleExtraInfoRoutine.trigger(!isExtraInfo));

  return (
    <Toggler
      text="Доп. инфо"
      defaultChecked={isExtraInfo}
      handleClick={handleClick}
      id="extra_toggle"
    />
  );
};

export default ToggleExtraInfo;
