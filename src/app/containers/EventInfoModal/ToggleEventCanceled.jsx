import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEventRoutine } from 'app/store/ducks/event.duck';
import Toggler from 'app/components/Toggler';

const ToggleEventVisibility = () => {
  const event = useSelector(state => state.schedule.event);
  const { _id, isCanceled } = event;
  const isAdmin = useSelector(state => state.session.profile.isAdmin);
  const dispatch = useDispatch();
  const handleClick = () =>
    dispatch({
      type: updateEventRoutine.TRIGGER,
      payload: { _id, isCanceled: !isCanceled },
    });

  if (isAdmin && event) {
    return (
      <Toggler
        text="Отмена мероприятия"
        defaultChecked={isCanceled}
        handleClick={handleClick}
        id="canceled_toggle"
      />
    );
  }
  return null;
};

export default ToggleEventVisibility;
