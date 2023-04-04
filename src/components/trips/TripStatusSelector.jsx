import React from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-translated';

import { STATUSES } from '../../trips';
import './TripStatusSelector.css';

const TripStatus = ({
  icon, name, description, status, selected, onSelect,
}) => (
  <div
    role="button"
    tabIndex={0}
    className={`col-4 TripStatus-item ${selected ? 'active' : ''}`}
    onClick={onSelect}
  >
    <div className="TripStatus-image">
      <img src={icon} alt={status} />
    </div>
    <div className="TripStatus-header">
      <Translate text={name} />
    </div>
    <div className="TripStatus-description d-none d-xs-none d-sm-none d-md-block">
      <Translate text={description} />
    </div>
  </div>
);

TripStatus.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const TripStatusSelector = ({ name, values, setFieldValue }) => (
  <div className="form-group">
    <div className="row TripStatus">
      {STATUSES.map(status => (
        <TripStatus
          status={status.key}
          selected={values[name] === status.key}
          onSelect={() => setFieldValue(name, status.key)}
          {...status}
        />
      ))}
    </div>
  </div>
);

TripStatusSelector.propTypes = {
  name: PropTypes.string.isRequired,
  values: PropTypes.shape({}).isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default TripStatusSelector;
