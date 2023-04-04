import React from 'react';
import { Translate } from 'react-translated';
import { Helmet } from 'react-helmet';

const NotFound = () => (
  <div className="container">
    <Helmet>
      <title>Oops! | Hamster Travel</title>
    </Helmet>
    <div className="row">
      <div className="col-12">
        <h3>
          <Translate text="Page not found" />
        </h3>
        <p>
          <Translate text="There is no such page here" />
        </p>
      </div>
    </div>
  </div>
);

export default NotFound;
