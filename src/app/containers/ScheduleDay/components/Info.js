import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';

const Info = ({ confirms, isCanceled, isHidden }) => {
  const isAdmin = useSelector(state => state.session.profile.isAdmin);
  return (
    <>
      <tr className="hidden-tr" />
      <tr className="info-tr">
        <td colSpan="4" className="info-td">
          {!isEmpty(confirms) && (
            <>
              <h5 className="subhead text-muted">
                Зарегистрировавшиеся участники:
              </h5>
              {confirms.map(item => (
                <div
                  key={item._id}
                  className="align-items-end justify-content-end"
                >
                  <h5 className="subhead">{`${item.user.name} - ${
                    item.user.departament
                  } - ${item.user.mail} - ${item.user.phone}`}</h5>
                </div>
              ))}
            </>
          )}
          {isHidden && (
            <h5 className="subhead text-info">
              Эта конференция скрыта от пользователей
            </h5>
          )}
          {isCanceled && isAdmin && (
            <h5 className="subhead text-danger">Эта конференция отменена</h5>
          )}
        </td>
      </tr>
    </>
  );
};

Info.propTypes = {
  confirms: PropTypes.array,
  isHidden: PropTypes.bool,
  isCanceled: PropTypes.bool,
};

export default Info;
