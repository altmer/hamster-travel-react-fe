import React from 'react';

import { Router, Route, Switch } from 'react-router-dom';
import ReactTranslated from 'react-translated';

import { useQuery } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet';

// browser history
import history from '../history';

// translations
import translation from '../translation';

// Routes
import GuestRoute from './GuestRoute';
import PrivateRoute from './PrivateRoute';

// Layout components
import TopNav from './layout/TopNav';
import Footer from './layout/Footer';

// Page components
import Landing from './Landing';
import NotFound from './NotFound';

import Login from './auth/Login';
import Registration from './auth/Registration';
import ChangePassword from './auth/ChangePassword';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';

import MyProfile from './profile/MyProfile';

import NewTrip from './trips/NewTrip';

// graphql
import GetLocaleQuery from '../graphql/queries/getLocale';

const App = () => {
  const {
    data: { locale },
  } = useQuery(GetLocaleQuery);
  return (
    <Router history={history}>
      <ReactTranslated.Provider language={locale} translation={translation}>
        <div className="App">
          <Helmet>
            <title>Hamster Travel</title>
          </Helmet>
          <ToastContainer autoClose={2000} />

          <TopNav />

          <Switch>
            <Route exact path="/" component={Landing} />

            <GuestRoute exact path="/login" component={Login} />
            <GuestRoute exact path="/register" component={Registration} />
            <GuestRoute
              exact
              path="/forgot_password"
              component={ForgotPassword}
            />
            <GuestRoute
              exact
              path="/reset_password/:token"
              component={ResetPassword}
            />

            <PrivateRoute exact path="/profile" component={MyProfile} />
            <PrivateRoute
              exact
              path="/change_password"
              component={ChangePassword}
            />
            <PrivateRoute exact path="/trips/new" component={NewTrip} />

            <Route component={NotFound} />
          </Switch>

          <Footer />
        </div>
      </ReactTranslated.Provider>
    </Router>
  );
};

export default App;
