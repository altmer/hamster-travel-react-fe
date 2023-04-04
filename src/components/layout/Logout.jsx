import React from 'react';
import { useMutation } from '@apollo/client';
import { DropdownItem } from 'reactstrap';
import { Translate } from 'react-translated';

import LOGOUT_MUTATION from '../../graphql/mutations/logout';
import history from '../../history';
import { storeLogout } from '../../store/session';

const onLogout = () => {
  storeLogout();
  setTimeout(() => {
    history.push('/');
  }, 10);
};

const Logout = () => {
  const [logout] = useMutation(LOGOUT_MUTATION);

  return (
    <DropdownItem onClick={() => logout().then(onLogout)}>
      <Translate text="Sign out" />
    </DropdownItem>
  );
};

export default Logout;
