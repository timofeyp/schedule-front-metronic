import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toggleShowCreateModal } from 'app/store/ducks/settings.duck';
import Form from 'app/containers/CreateEventModal/Form';

const View = ({
  isShowCreateModal,
  eventsNames,
  eventNameInput,
  toggleModal,
}) => {
  const toggleHandler = () => toggleModal(!isShowCreateModal);
  return (
    <>
      <Modal centered show={isShowCreateModal} onHide={toggleHandler} size="lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Добавить конференцию
          </Modal.Title>
        </Modal.Header>
        <Form eventNameInput={eventNameInput} eventsNames={eventsNames} />
      </Modal>
    </>
  );
};

View.propTypes = {
  isShowCreateModal: PropTypes.bool,
  eventsNames: PropTypes.array,
  eventNameInput: PropTypes.string,
  toggleModal: PropTypes.func,
};

const mapStateToProps = ({ settings, creating }) => ({
  isShowCreateModal: settings.isShowCreateModal,
  eventsNames: creating.eventsNames,
  eventNameInput: creating.eventNameInput,
});

const mapDispatchToProps = {
  toggleModal: toggleShowCreateModal.success,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
