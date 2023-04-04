import React from 'react';
import PropTypes from 'prop-types';

import './Avatar.css';

export const Avatar = (props) => {
  if (props.avatarThumb) {
    return <img alt={props.initials} src={props.avatarThumb} className="Avatar" />;
  }
  return <div className={`Avatar Avatar-Placeholder ${props.color}`}>{props.initials}</div>;
};

Avatar.propTypes = {
  color: PropTypes.string,
  initials: PropTypes.string,
  avatarThumb: PropTypes.string,
};

Avatar.defaultProps = {
  color: '',
  initials: 'XX',
  avatarThumb: null,
};

export default Avatar;
