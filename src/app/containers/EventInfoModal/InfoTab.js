import React from 'react';
import PropTypes from 'prop-types';

const InfoTab = ({
  chairman,
  responsibleDisplayname,
  responsibleDept,
  locationName,
}) => (
  <>
    {chairman && (
      <div>
        <b>Председатель: </b>
        {chairman}
      </div>
    )}
    {responsibleDisplayname && (
      <div>
        <b>Ответственный: </b>
        {responsibleDisplayname}
      </div>
    )}
    {responsibleDept && (
      <div>
        <b>Департамент: </b>
        {responsibleDept}
      </div>
    )}
    {locationName && (
      <div>
        <b>Студия: </b>
        {locationName}
      </div>
    )}
  </>
);

InfoTab.propTypes = {
  chairman: PropTypes.string,
  responsibleDisplayname: PropTypes.string,
  responsibleDept: PropTypes.string,
  locationName: PropTypes.string,
};

export default InfoTab;
