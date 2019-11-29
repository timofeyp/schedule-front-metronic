import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { makeSelectEvent } from 'containers/Schedule/selectors';
import {
  makeSelectEventNames,
  makeSelectEventNameInput,
} from 'containers/CreateEvent/selectors';
import { connect, useDispatch } from 'react-redux';
import { toggleShowCreateModal } from 'containers/App/settings/constants';
import { makeSelectIsShowCreateModal } from 'acontainers/App/settings/selectors';
import Form from 'app/containers/CreateEvent/Form';


const View = ({ showCreateModal, eventsNames, eventNameInput }) => {


  const dispatch = useDispatch();
  const toggleHandler = () =>
    dispatch(toggleShowCreateModal.success(!showCreateModal));
  return (
    <Modal
      isOpen={showCreateModal}
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
        <h4 className="bold-text  modal__title">Добавить конференцию</h4>
      </div>
      <Form eventNameInput={eventNameInput} eventsNames={eventsNames} />
    </Modal>
  );
};

View.propTypes = {
  showCreateModal: PropTypes.bool,
  eventsNames: PropTypes.array,
  eventNameInput: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  event: makeSelectEvent(),
  showCreateModal: makeSelectIsShowCreateModal(),
  eventsNames: makeSelectEventNames(),
  eventNameInput: makeSelectEventNameInput(),
});

export default connect(
  mapStateToProps,
  null,
)(View);
