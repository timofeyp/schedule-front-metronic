import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { eraseEventRoutine } from 'app/store/ducks/event.duck';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import ModalTabs from 'app/containers/EventInfoModal/ModalTabs';

const EventInfoModal = ({ isOpen, toggleHandler, event, eraseEvent }) => {
  useEffect(() => {
    if (!isOpen) {
      eraseEvent();
    }
  }, [eraseEvent, isOpen]);
  return (
    !isEmpty(event) && (
      <Modal centered show={isOpen} onHide={toggleHandler} size="lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {event.eventName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pl-o pr-0">
          <ModalTabs data={event} />
        </Modal.Body>
      </Modal>
    )
  );
};

EventInfoModal.propTypes = {
  event: PropTypes.object,
  eraseEvent: PropTypes.func,
  isOpen: PropTypes.bool,
  toggleHandler: PropTypes.func,
};

const mapStateToProps = store => ({
  event: store.event.data,
});

const mapDispatchToProps = {
  eraseEvent: () => eraseEventRoutine.success(),
};

export default connect(mapStateToProps, mapDispatchToProps)(EventInfoModal);
