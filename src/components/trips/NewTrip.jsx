import React from 'react';
import { Translator } from 'react-translated';
import { Helmet } from 'react-helmet';

import TripForm from './TripForm';

import CREATE_TRIP from '../../graphql/mutations/createTrip';

const NewTrip = () => (
  <div className="container">
    <Translator>
      {({ translate }) => (
        <Helmet>
          <title>{`${translate({ text: 'New trip' })} | Hamster Travel`}</title>
        </Helmet>
      )}
    </Translator>
    <TripForm header="New trip" mutation={CREATE_TRIP} />
  </div>
);

export default NewTrip;
