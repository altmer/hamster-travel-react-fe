import React, { useState } from 'react';
import { Input, FormGroup } from 'reactstrap';
import { Translator } from 'react-translated';
import { Search, X } from 'react-feather';

import './GlobalSearch.css';
import searchIcon from '../../images/search.svg';

const GlobalSearch = () => {
  const [isMobileVisible, setIsMobileVisible] = useState(false);
  const showMobileSearch = () => setIsMobileVisible(true);
  const hideMobileSearch = () => setIsMobileVisible(false);

  return (
    <FormGroup className="GlobalSearch form-inline mr-auto">
      <span className="d-none d-md-inline">
        <img src={searchIcon} alt="search" className="desktop-search-icon" />
        <Translator>
          {({ translate }) => (
            <Input
              type="text"
              placeholder={translate({ text: 'Search' })}
              className="desktop-search-input"
            />
          )}
        </Translator>
      </span>
      <span className="d-xs-inline d-sm-inline d-md-none">
        <a
          role="button"
          onClick={showMobileSearch}
          tabIndex={0}
          className="mobile-search-open nav-link"
        >
          <Search color="black" />
        </a>
        {isMobileVisible && (
          <span>
            <Translator>
              {({ translate }) => (
                <Input
                  type="text"
                  autoFocus
                  placeholder={translate({ text: 'Search' })}
                  className="mobile-search-input"
                />
              )}
            </Translator>
            <a
              role="button"
              onClick={hideMobileSearch}
              tabIndex={0}
              className="mobile-search-close"
            >
              <X color="black" />
            </a>
          </span>
        )}
      </span>
    </FormGroup>
  );
};

export default GlobalSearch;
