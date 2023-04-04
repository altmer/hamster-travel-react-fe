import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

import { isAuthenticated } from '../store/session';

const GuestRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (isAuthenticated() ? <Redirect to="/" push /> : React.createElement(component, props))
    }
  />
);

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default GuestRoute;
