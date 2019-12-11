import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

const Info = ({ confirms, isCanceled, isHidden }) => {
  const isAdmin = useSelector(state => state.session.profile.isAdmin);
  return (
    <>
      {!isEmpty(confirms) && (
        <>
          <div className="subhead text-muted">
            Зарегистрировавшиеся участники:
          </div>
          {confirms.map(item => (
            <div key={item._id} className="align-items-end justify-content-end">
              {`${item.user.name} - ${item.user.departament} - ${item.user.mail} - ${item.user.phone}`}
            </div>
          ))}
        </>
      )}
      {isHidden && (
        <Button
          style={{ borderRadius: '4px', padding: '0.4em' }}
          variant="secondary"
          size="sm"
          disabled
        >
          Эта конференция скрыта от пользователей
        </Button>
      )}
      {isHidden && (
        <Button
          style={{ borderRadius: '4px', padding: '0.4em' }}
          variant="secondary"
          size="sm"
          disabled
        >
          Эта конференция скрыта от пользователей
        </Button>
      )}
      {/* {isCanceled && isAdmin && ( */}
      {/*  <div className="subhead text-danger">Эта конференция отменена</div> */}
      {/* )} */}
    </>
  );
};

Info.propTypes = {
  confirms: PropTypes.array,
  isHidden: PropTypes.bool,
  isCanceled: PropTypes.bool,
};

export default Info;
