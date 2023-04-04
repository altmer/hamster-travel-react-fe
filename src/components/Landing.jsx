import React from 'react';
import PropTypes from 'prop-types';
import { Translate, Translator } from 'react-translated';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet';

import CURRENT_USER_QUERY from '../graphql/queries/currentUser';
import { localCurrentUser } from '../store/session';

import './Landing.css';
import iphoneMock from '../images/landing/iphone-mock.png';
import macMock from '../images/landing/macbook-mock.png';

import budgetScreenshot from '../images/landing/budget.png';
import budgetIcon from '../images/landing/budget.svg';

import activitiesScreenshot from '../images/landing/activities.png';
import activitiesIcon from '../images/landing/activities.svg';

import profileScreenshot from '../images/landing/profile.png';
import profileIcon from '../images/landing/profile.svg';

import transfersScreenshot from '../images/landing/transfers.png';
import transfersIcon from '../images/landing/transfers.svg';

const ActionButtons = ({ currentUser }) => {
  if (!currentUser) {
    return (
      <React.Fragment>
        <Link className="btn btn-success btn-lg" to="/register">
          <Translate text="Create account" />
        </Link>
        <Link className="btn btn-primary btn-lg" to="/login">
          <Translate text="Login" />
        </Link>
      </React.Fragment>
    );
  }
  return (
    <Link className="btn btn-primary btn-lg" to="/trips/new">
      <Translate text="Start planning" />
    </Link>
  );
};

ActionButtons.propTypes = {
  currentUser: PropTypes.shape({}),
};

ActionButtons.defaultProps = {
  currentUser: null,
};

const CallButton = ({ currentUser }) => {
  if (!currentUser) {
    return (
      <Link className="btn btn-success btn-lg" to="/register">
        <Translate text="Create account" />
      </Link>
    );
  }
  return (
    <Link className="btn btn-primary btn-lg" to="/trips/new">
      <Translate text="Start planning" />
    </Link>
  );
};

CallButton.propTypes = {
  currentUser: PropTypes.shape({}),
};

CallButton.defaultProps = {
  currentUser: null,
};

const Landing = () => {
  const { data, loading } = useQuery(CURRENT_USER_QUERY, {
    errorPolicy: 'ignore',
  });

  const currentUser = localCurrentUser(data, loading);

  return (
    <div className="Landing">
      <Translator>
        {({ translate }) => (
          <Helmet>
            <title>{`${translate({
              text: 'Travel planning',
            })} | Hamster Travel`}</title>
          </Helmet>
        )}
      </Translator>
      <div className="container">
        <div className="row hero-area">
          <div className="col-12 col-md-6">
            <h3 className="hero-header">
              <Translate text="Travel confident" />
            </h3>
            <p className="hero-text">
              <Translate text="Travel confident text" />
            </p>
            <div className="form-group hero-actions">
              <ActionButtons currentUser={currentUser} />
            </div>
          </div>
          <div className="col-md-6 d-none d-md-block hero-images">
            <img
              alt="desktop mock"
              width="500"
              height="500"
              src={macMock}
              className="desktop-mock"
            />
            <img
              alt="mobile mock"
              width="350"
              height="350"
              src={iphoneMock}
              className="mobile-mock"
            />
          </div>
        </div>
      </div>
      <div className="feature-row feature-row-grey">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-none d-md-block">
              <img
                alt="budget feature"
                width="500"
                height="165"
                src={budgetScreenshot}
                className="feature-image"
              />
            </div>
            <div className="feature-text col-12 col-md-6">
              <div className="feature-header">
                <img
                  alt="budget-icon"
                  width="36"
                  height="36"
                  src={budgetIcon}
                  className="feature-icon"
                />
                <span>
                  <Translate text="Be on top of your budget" />
                </span>
              </div>
              <div className="feature-description">
                <Translate text="Be on top of your budget text" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="feature-row">
        <div className="container">
          <div className="row">
            <div className="feature-text feature-transfers-text col-12 col-md-6">
              <div className="feature-header">
                <img
                  alt="transfers-icon"
                  width="36"
                  height="36"
                  src={transfersIcon}
                  className="feature-icon"
                />
                <span>
                  <Translate text="Plan your transfers" />
                </span>
              </div>
              <div className="feature-description">
                <Translate text="Plan your transfers text" />
              </div>
            </div>
            <div className="col-md-6 d-none d-md-block">
              <img
                alt="transfers feature"
                width="500"
                height="238"
                src={transfersScreenshot}
                className="feature-image"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="feature-row feature-row-grey">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-none d-md-block">
              <img
                alt="activities feature"
                width="500"
                height="509"
                src={activitiesScreenshot}
                className="feature-image"
              />
            </div>
            <div className="feature-text feature-activities-text col-12 col-md-6">
              <div className="feature-header">
                <img
                  alt="activities-icon"
                  width="36"
                  height="36"
                  src={activitiesIcon}
                  className="feature-icon"
                />
                <span>
                  <Translate text="Create daily plans" />
                </span>
              </div>
              <div className="feature-description">
                <Translate text="Create daily plans text" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="feature-row">
        <div className="container">
          <div className="row">
            <div className="feature-text feature-profile-text col-12 col-md-6">
              <div className="feature-header">
                <img
                  alt="profile-icon"
                  width="36"
                  height="36"
                  src={profileIcon}
                  className="feature-icon"
                />
                <span>
                  <Translate text="Track your travels" />
                </span>
              </div>
              <div className="feature-description">
                <Translate text="Track your travels text" />
              </div>
            </div>
            <div className="col-md-6 d-none d-md-block">
              <img
                alt="profile feature"
                width="500"
                height="348"
                src={profileScreenshot}
                className="feature-image"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row final-row">
          <div className="col-12">
            <h2>
              <Translate text="Start using Hamster Travel right now" />
            </h2>
            <div className="final-action">
              <CallButton currentUser={currentUser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
