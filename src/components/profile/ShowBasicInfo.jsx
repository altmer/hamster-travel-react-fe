import React from 'react';
import PropTypes from 'prop-types';

import Avatar from './Avatar';

import moneyImg from '../../images/money.svg';
import './ShowBasicInfo.css';

const ShowBasicInfo = ({ user }) => (
  <React.Fragment>
    <Avatar {...user} />
    <div className="UserProfileText">
      <div className="UserProfileName">{user.name}</div>
      {user.currency && (
        <div className="UserProfileCurrency UserProfileFeature">
          <img src={moneyImg} alt="user's currency" />
          {user.currency}
        </div>
      )}
      {user.homeTownText && (
        <div className="UserProfileHomeTown UserProfileFeature">
          {user.homeTownText}
        </div>
      )}
    </div>
  </React.Fragment>
);

ShowBasicInfo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    homeTownText: PropTypes.string,
    currency: PropTypes.string,
  }).isRequired,
};

export default ShowBasicInfo;
