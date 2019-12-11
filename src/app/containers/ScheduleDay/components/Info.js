import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import InfoWarning from 'app/components/Buttons/InfoWarning';

const Info = ({ confirms, isCanceled, isHidden }) => {
  const isAdmin = useSelector(state => state.session.profile.isAdmin);
  const { isExtraInfo } = useSelector(state => state.settings);
  if (isExtraInfo) {
    return (
      <>
        {!isEmpty(confirms) && (
          <>
            <div className="subhead text-muted">
              Зарегистрировавшиеся участники:
            </div>
            {confirms.map(item => (
              <div
                key={item._id}
                className="align-items-end justify-content-end"
              >
                {`${item.user.name} - ${item.user.departament} - ${item.user.mail} - ${item.user.phone}`}
              </div>
            ))}
          </>
        )}
        {isHidden && (
          <InfoWarning active disabled variant="warning">
            Эта конференция скрыта от пользователей
          </InfoWarning>
        )}
        {isCanceled && isAdmin && (
          <InfoWarning active disabled variant="danger">
            Эта конференция отменена
          </InfoWarning>
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
