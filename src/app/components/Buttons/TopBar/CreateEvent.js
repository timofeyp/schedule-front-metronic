import React from 'react';
import TopBarButton from 'app/components/Buttons/TopBar/TopBarButton';
import Add from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { toggleShowCreateModal } from 'app/store/ducks/settings.duck';
import PropTypes from 'prop-types';

const CreateEvent = ({ toggleModal }) => {
  const handleClick = () => toggleModal(true);
  return (
    <TopBarButton handleClick={handleClick} tipText="Добавить конференцию">
      <Add />
    </TopBarButton>
  );
};

CreateEvent.propTypes = {
  toggleModal: PropTypes.func,
};

const mapDispatchToProps = {
  toggleModal: toggleShowCreateModal.success,
};

export default connect(null, mapDispatchToProps)(CreateEvent);
