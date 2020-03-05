import React from 'react';
import { Row, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { acceptEventRoutine } from 'app/store/ducks/event.duck';

const AcceptionButtons = ({ isShown, eventId }) => {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(acceptEventRoutine.trigger(eventId));
  if (isShown) {
    return (
      <Row className="justify-content-center">
        <Button
          onClick={handleClick}
          style={{ minWidth: '15em' }}
          variant="success"
        >
          Подтвердить
        </Button>
      </Row>
    );
  }
  return null;
};

AcceptionButtons.propTypes = {
  isShown: PropTypes.bool,
  eventId: PropTypes.string,
};

export default AcceptionButtons;
