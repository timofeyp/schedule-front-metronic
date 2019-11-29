import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import InfoRow from 'app/containers/ScheduleDay/components/Info';
import { useSelector } from 'react-redux';
import { CancelTag } from 'app/components/Buttons/styles';
import TableField from 'app/components/Fields/TableField';

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
  const settings = useSelector(state => state.settings);
  const isAdmin = useSelector(state => state.session.profile.isAdmin);
  const isInfo =
    (isHidden || (isCanceled && isAdmin) || !isEmpty(confirms)) &&
    settings &&
    settings.showInfoValue;
  const handleClick = e => {
    if (e.target.id !== 'room') {
      eventClickHandler(_id);
    }
  };
  const handleChangeRoom = e => {
    eventRoomChangeHandler(_id, e.target.value, num - 1, dayId);
  };
  return (
    <>
      <tr onClick={handleClick}>
        <th className="no-wrap" scope="row">
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
        <td
          id={isAdmin ? 'room' : ''}
          className="no-wrap"
          style={{ textAlign: 'end' }}
        >
          {isAdmin ? (
            <TableField
              disabled={!isAdmin}
              defaultValue={localRoom}
              num={num}
              _id={_id}
              onChange={handleChangeRoom}
            />
          ) : (
            localRoom
          )}
        </td>
        <td className="no-wrap" style={{ textAlign: 'end' }}>
          {timeStart}-{timeEnd}
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
