import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar, Modal } from 'reactstrap';
import { eraseEventRoutine } from 'app/store/ducks/event.duck';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import ModalTabs from 'app/containers/ModalTabs';

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
      <Modal
        isOpen={isOpen}
        toggle={toggleHandler}
        className="modal-dialog--success modal-dialog--header"
        size="sm"
      >
        <div className="modal__header">
          <button
            className="lnr lnr-cross modal__close-btn"
            type="button"
            onClick={toggleHandler}
          />
          <span className="lnr lnr-pushpin modal__title-icon" />
          <h4 className="bold-text  modal__title">{event.eventName}</h4>
        </div>
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
  event: store.event.event,
});

const mapDispatchToProps = {
  eraseEvent: () => eraseEventRoutine.success(),
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  EventInfoModal,
);
