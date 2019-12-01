import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';
import { eraseEventRoutine } from 'app/store/ducks/event.duck';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import ModalTabs from 'app/containers/EventInfoModal/ModalTabs';

const EventInfoModal = ({ isOpen, toggleHandler, event, eraseEvent }) => {
  const color = '#003274';
  const colored = true;
  useEffect(() => {
    if (!isOpen) {
      eraseEvent();
    }
  }, [eraseEvent, isOpen]);
  return (
    !isEmpty(event) && (
      <Modal show={isOpen} onHide={toggleHandler} size="lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {event.eventName}
          </Modal.Title>
        </Modal.Header>
        <ModalTabs data={event} />
        <ButtonToolbar className="modal__footer">
          <Button outline={colored} color={color} onClick={toggleHandler}>
            OK
          </Button>
        </ButtonToolbar>
      </Modal>
    )
  );
};

EventInfoModal.propTypes = {
  event: PropTypes.object,
  eraseEvent: PropTypes.func,
};

const mapStateToProps = store => ({
  event: store.event.data,
});

const mapDispatchToProps = {
  eraseEvent: () => eraseEventRoutine.success(),
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  EventInfoModal,
);
