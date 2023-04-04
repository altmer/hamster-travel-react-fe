import React from 'react';
import { useQuery } from '@apollo/client';

import LoginActions from './LoginActions';
import UserMenu from './UserMenu';

import CURRENT_USER_QUERY from '../../graphql/queries/currentUser';
import { localCurrentUser } from '../../store/session';

const Session = () => {
  const { data, loading } = useQuery(CURRENT_USER_QUERY, {
    errorPolicy: 'ignore',
  });
  const user = localCurrentUser(data, loading);
  if (!user) {
    return <LoginActions />;
  }
  return <UserMenu user={user} />;
};

export default Session;
