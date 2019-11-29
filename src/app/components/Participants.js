import React from 'react';
import PropTypes from 'prop-types';

const Participants = ({ VCParts }) => (
  <div>
    {VCParts.map((VCGroup, i) =>
      VCGroup.VCParts.length ? (
        // eslint-disable-next-line react/no-array-index-key
        <h4 key={i} className="subhead mb-1">
          {`${VCGroup.groupName}: `}
          <span className="dark-text">
            {VCGroup.VCParts.map(VCPart => `${VCPart.name} / `)}
          </span>
        </h4>
      ) : null,
    )}
  </div>
);

Participants.propTypes = {
  VCParts: PropTypes.array,
};

export default Participants;
