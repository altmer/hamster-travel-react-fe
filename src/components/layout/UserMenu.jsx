import React from 'react';
import PropTypes from 'prop-types';

import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Translate } from 'react-translated';
import { Link } from 'react-router-dom';

import Logout from './Logout';
import Avatar from '../profile/Avatar';

import './UserMenu.css';

const UserMenu = ({ user }) => (
  <UncontrolledDropdown className="UserMenu" nav>
    <DropdownToggle nav>
      <Avatar {...user} />
    </DropdownToggle>
    <DropdownMenu right>
      <DropdownItem tag={Link} to="/profile">
        <Translate text="My profile" />
      </DropdownItem>
      <DropdownItem tag={Link} to="/change_password">
        <Translate text="Change password" />
      </DropdownItem>
      <DropdownItem divider />
      <Logout />
    </DropdownMenu>
  </UncontrolledDropdown>
);

UserMenu.propTypes = {
  user: PropTypes.shape({}).isRequired,
};

export default UserMenu;
