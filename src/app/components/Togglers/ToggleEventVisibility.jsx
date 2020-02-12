import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEventRoutine } from 'app/store/ducks/event.duck';
import Toggler from 'app/components/Togglers/Toggler';

const ToggleEventVisibility = () => {
  const event = useSelector(state => state.event.data);
  const { _id, isHidden } = event;
  const isAdmin = useSelector(state => state.session.profile.isAdmin);
  const dispatch = useDispatch();
  const handleClick = () =>
    dispatch(
      updateEventRoutine.trigger({ event: { _id, isHidden: !isHidden } }),
    );

  if (isAdmin) {
    return (
      <Toggler
        text="Скрыть конференцию от пользователей"
        defaultChecked={isHidden}
        handleClick={handleClick}
        id="hidden_toggle"
        isButtonLeft
      />
    );
  }
  return null;
};

export default ToggleEventVisibility;
