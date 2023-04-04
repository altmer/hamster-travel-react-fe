import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-translated';
import { NavItem } from 'reactstrap';

import './LoginActions.css';

const LoginActions = () => (
  <React.Fragment>
    <NavItem className="LoginActions-btn LoginActions-login">
      <Link to="/login" className="nav-link">
        <Translate text="Login" />
      </Link>
    </NavItem>
    <NavItem className="LoginActions-btn LoginActions-register d-none d-xs-none d-sm-none d-md-block">
      <Link to="/register" className="nav-link">
        <Translate text="Register" />
      </Link>
    </NavItem>
  </React.Fragment>
);

export default LoginActions;
