import React from 'react';
import { connect } from 'react-redux';
import { updateEventRoutine } from 'app/store/ducks/event.duck';
import Toggler from 'app/components/Togglers/Toggler';
import PropTypes from 'prop-types';

const ToggleEventVisibility = ({ event, updateEvent, isAdmin }) => {
  const { _id, isCanceled } = event;
  const handleClick = () => updateEvent({ _id, isCanceled: !isCanceled });

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

const mapStateToProps = store => ({
  event: store.event.data,
  isAdmin: store.session.profile.isAdmin,
});

const mapDispatchToProps = {
  updateEvent: updateEventRoutine.trigger,
};

ToggleEventVisibility.propTypes = {
  event: PropTypes.object,
  isAdmin: PropTypes.bool,
  updateEvent: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToggleEventVisibility);
