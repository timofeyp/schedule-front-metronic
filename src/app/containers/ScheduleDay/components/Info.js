import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Col, Row } from 'react-bootstrap';

const Info = ({
  confirms,
  isHidden,
  handleClick,
  isInfo,
  isPossiblyCanceled,
  isPendingForAccept,
}) => {
  if (isInfo) {
    return (
      <Row className="pt-1" onClick={handleClick}>
        <Col xs={{ span: 8, offset: 1 }}>
          {isHidden && (
            <div className="text-warning">
              Эта конференция скрыта от пользователей
            </div>
          )}
          {isPendingForAccept && (
            <div className="text-warning">
              Концеренция была добавлена пользователем и ожидает подтверждения.
            </div>
          )}
          {isPossiblyCanceled && (
            <div className="text-danger">
              Конференция отсутствует в расписании на портале концерна. Уточнить
              отмену.
            </div>
          )}
          {!isEmpty(confirms) && (
            <>
              <div className="text-primary">
                Зарегистрировавшиеся участники:
              </div>
              {confirms.map(item => (
                <div
                  key={item._id}
                  className="text-primary align-items-end justify-content-end"
                >
                  {`${item.user.name} - ${item.user.department} - ${item.user.mail} - ${item.user.phone}`}
                </div>
              ))}
            </>
          )}
        </Col>
      </Row>
    );
  }
  return null;
};

Info.propTypes = {
  confirms: PropTypes.array,
  isHidden: PropTypes.bool,
  handleClick: PropTypes.func,
  isInfo: PropTypes.bool,
  isPossiblyCanceled: PropTypes.bool,
  isPendingForAccept: PropTypes.bool,
};

export default Info;
