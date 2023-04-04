import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-translated';
import { PlusCircle } from 'react-feather';

import './AddTripButton.css';

const AddTripButton = () => (
  <React.Fragment>
    <Link className="nav-link AddTripButton d-none d-xs-none d-sm-block" to="/trips/new">
      <Translate text="Add plan" />
    </Link>
    <Link className="nav-link AddTripButton-image d-xs-block d-sm-none" to="/trips/new">
      <PlusCircle />
    </Link>
  </React.Fragment>
);

export default AddTripButton;
