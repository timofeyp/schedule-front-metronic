import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import InfoRow from 'app/containers/ScheduleDay/components/Info';
import { useSelector } from 'react-redux';
import { CancelTag } from 'app/components/Buttons/styles';
import EditableTd from 'app/components/Fields/EditableTd';

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
  eventClickHandler,
  eventRoomChangeHandler,
  num,
}) => {
  const handleChangeRoom = e => {
    eventRoomChangeHandler({
      _id,
      localRoom: e.target.value,
    });
  };
  const settings = useSelector(state => state.settings);
  const isAdmin = useSelector(state => state.session.profile.isAdmin);
  const isInfo =
    (isHidden || (isCanceled && isAdmin) || !isEmpty(confirms)) &&
    settings &&
    settings.showInfoValue;
  const handleClick = e => {
    if (e.target.id !== 'localRoom') {
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
        {isAdmin ? (
          <EditableTd
            className="text-nowrap"
            innerText={localRoom}
            handleChange={handleChangeRoom}
          />
        ) : (
          <td>{localRoom}</td>
        )}
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
  event: PropTypes.object,
  eventRoomChangeHandler: PropTypes.func,
  eventClickHandler: PropTypes.func,
  num: PropTypes.number,
};

export default EventRow;
