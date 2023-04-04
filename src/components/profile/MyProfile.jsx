import React from 'react';

import { Translator } from 'react-translated';
import { Helmet } from 'react-helmet';

import { useQuery } from '@apollo/client';

import UserProfile from './UserProfile';

import { localCurrentUser } from '../../store/session';
import CURRENT_USER_QUERY from '../../graphql/queries/currentUser';

const Profile = () => {
  const { data, loading } = useQuery(CURRENT_USER_QUERY, {
    errorPolicy: 'ignore',
  });
  const user = localCurrentUser(data, loading);
  return (
    <React.Fragment>
      <Translator>
        {({ translate }) => (
          <Helmet>
            <title>{`${translate({
              text: 'Profile',
            })} | Hamster Travel`}</title>
          </Helmet>
        )}
      </Translator>
      <UserProfile user={user} editable />
    </React.Fragment>
  );
};

export default Profile;
