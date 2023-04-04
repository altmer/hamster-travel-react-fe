import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Translate } from 'react-translated';

import ShowBasicInfo from './ShowBasicInfo';
import EditBasicInfo from './EditBasicInfo';

import './UserProfile.css';

const UserProfile = ({ user, editable }) => {
  const [edit, setEdit] = useState(false);

  return (
    <div className="container UserProfile">
      <div className="row">
        <div className="col-12 UserProfileBasic">
          {!edit && <ShowBasicInfo user={user} />}
          {editable && edit && (
            <EditBasicInfo user={user} onEditFinish={() => setEdit(false)} />
          )}
        </div>
      </div>
      {editable && !edit && (
        <div className="row EditProfileLink">
          <div className="col-12">
            <a href="#0" onClick={() => setEdit(true)}>
              <Translate text="Edit profile" />
            </a>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-12">
          <div className="UserProfileStatistics">
            <div className="UserProfileStatistic">
              <div className="UserProfileStatisticText">
                <Translate text="Trips count" />
              </div>
              <div className="UserProfileStatisticNumber">0</div>
            </div>
            <div className="UserProfileStatistic">
              <div className="UserProfileStatisticText">
                <Translate text="Countries count" />
              </div>
              <div className="UserProfileStatisticNumber">0</div>
            </div>
            <div className="UserProfileStatistic">
              <div className="UserProfileStatisticText">
                <Translate text="Cities count" />
              </div>
              <div className="UserProfileStatisticNumber">0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  user: PropTypes.shape({}).isRequired,
  editable: PropTypes.bool.isRequired,
};

export default UserProfile;
