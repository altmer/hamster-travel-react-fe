import React from 'react';
import { useQuery } from '@apollo/client';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Translate } from 'react-translated';

import GlobalSearch from './GlobalSearch';
import Locale from './Locale';
import Session from './Session';
import AddTripButton from './AddTripButton';
import CURRENT_USER_QUERY from '../../graphql/queries/currentUser';

import './TopNav.css';
import logo from '../../images/logo.svg';

export const TopNav = () => {
  const { data, loading } = useQuery(CURRENT_USER_QUERY, {
    errorPolicy: 'ignore',
  });

  return (
    <div className="container">
      <Navbar light className="TopNav" expand="xs">
        <NavbarBrand href="/">
          <img
            src={logo}
            className="TopNav-logo d-xs-inline d-sm-inline d-md-none"
            alt="logo"
          />
          <span className="d-none d-xs-none d-sm-none d-md-inline">
            Hamster Travel
          </span>
        </NavbarBrand>
        <GlobalSearch />
        <Nav navbar className="ml-auto">
          {!loading && data && data.currentUser && (
            <NavItem>
              <AddTripButton />
            </NavItem>
          )}
          <NavItem>
            <Link to="/trips" className="nav-link">
              <Translate text="Trips" />
            </Link>
          </NavItem>
          <Locale />
          <Session />
        </Nav>
      </Navbar>
    </div>
  );
};

export default TopNav;
