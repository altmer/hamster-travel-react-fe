import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import CurrentUserQuery from '../graphql/queries/currentUser';
import { storeToken, storeLogin } from '../store/session';
import client from '../api/client';

const OauthRoute = props => (
  <Route
    {...props}
    render={() => {
      const params = new URLSearchParams(window.location.search);

      if (params.get('result') === 'success') {
        const token = params.get('token');
        storeToken(token);
        client.query({ query: CurrentUserQuery }).then(({ data: { currentUser } }) => {
          storeLogin({ currentUser, token });
        });
        return <Redirect to="/" push />;
      }
      toast.error('Login failed');
      return <Redirect to="/login" push />;
    }}
  />
);

export default OauthRoute;
