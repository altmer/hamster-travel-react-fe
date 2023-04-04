import React from 'react';

import './Footer.css';

const Footer = () => (
  <footer className="Footer">
    <div className="container">
      <div className="row">
        <div className="col-md-3 col-12">
          Hamster Travel <br /> 2014 - 2018
        </div>
        <div className="col-md-9 col-12">
          <a
            href="https://github.com/altmer"
            target="_blank"
            rel="noopener noreferrer"
          >
            Andrey Marchenko
          </a>
          <a
            href="http://vk.com/id88528"
            target="_blank"
            rel="noopener noreferrer"
          >
            Yulia Marchenko
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
