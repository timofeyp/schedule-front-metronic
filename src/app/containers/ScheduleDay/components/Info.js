import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';

const Info = ({ confirms, isCanceled, isHidden }) => {
  const isAdmin = useSelector(state => state.session.profile.isAdmin);
  const { isExtraInfo } = useSelector(state => state.settings);
  if (isExtraInfo) {
    return (
      <>
        {isHidden && isAdmin && (
          <div className="text-warning">
            Эта конференция скрыта от пользователей
          </div>
        )}
        {isCanceled && (
          <div className="text-danger">Эта конференция отменена</div>
        )}
        {!isEmpty(confirms) && (
          <>
            <div className="text-primary">Зарегистрировавшиеся участники:</div>
            {confirms.map(item => (
              <div
                key={item._id}
                className="text-primary align-items-end justify-content-end"
              >
                {`${item.user.name} - ${item.user.departament} - ${item.user.mail} - ${item.user.phone}`}
              </div>
            ))}
          </>
        )}
      </>
    );
  }
  return null;
};

Info.propTypes = {
  confirms: PropTypes.array,
  isHidden: PropTypes.bool,
  isCanceled: PropTypes.bool,
};

export default Info;
