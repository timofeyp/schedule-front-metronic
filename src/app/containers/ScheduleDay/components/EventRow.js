import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import InfoRow from 'app/containers/ScheduleDay/components/Info';
import { useSelector } from 'react-redux';
import { CancelTag } from 'app/components/Buttons/styles';
import { EditableTd } from 'app/containers/ScheduleDay/components/styles';

const EventRow = ({
  event: {
    isHidden,
    isCanceled,
    confirms,
    _id,
    eventName,
    timeStart,
    timeEnd,
    localRoom,
  },
  dayId,
  eventClickHandler,
  eventRoomChangeHandler,
  num,
}) => {
  const handleChangeRoom = e => {
    eventRoomChangeHandler(_id, e, num - 1, dayId);
  };
  useEffect(() => {
    const editable = document.getElementById(`room-${_id}`);
    editable.addEventListener('input', e => {
      handleChangeRoom(e.target.innerText);
    });
  }, [_id, handleChangeRoom]);
  const settings = useSelector(state => state.settings);
  const isAdmin = useSelector(state => state.session.profile.isAdmin);
  const isInfo =
    (isHidden || (isCanceled && isAdmin) || !isEmpty(confirms)) &&
    settings &&
    settings.showInfoValue;
  const handleClick = e => {
    if (e.target.id !== `room-${_id}`) {
      eventClickHandler(_id);
    }
  };

  return (
    <>
      <tr onClick={handleClick}>
        <th className="text-nowrap" scope="row">
          {++num}
        </th>
        <td key={_id}>
          {eventName}
          {isCanceled && !isAdmin && (
            <CancelTag disabled className="text-danger">
              Мероприятие отменено
            </CancelTag>
          )}
        </td>
        <EditableTd
          id={isAdmin ? `room-${_id}` : ''}
          className="text-nowrap"
          style={{ textAlign: 'end' }}
          contentEditable
        >
          {localRoom}
        </EditableTd>
        <td className="text-nowrap" style={{ textAlign: 'end' }}>
          {`${timeStart} - ${timeEnd}`}
        </td>
      </tr>
      {isInfo && (
        <InfoRow
          isHidden={isHidden}
          isCanceled={isCanceled}
          confirms={confirms}
        />
      )}
    </>
  );
};

EventRow.propTypes = {
  dayId: PropTypes.number,
  event: PropTypes.object,
  eventRoomChangeHandler: PropTypes.func,
  eventClickHandler: PropTypes.func,
  num: PropTypes.number,
};

export default EventRow;
