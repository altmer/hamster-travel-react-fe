import React from 'react';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { useQuery } from '@apollo/client';

import GetLocaleQuery from '../../graphql/queries/getLocale';
import { setLocale } from '../../store/locale';

import ruflag from '../../images/flags/ru.png';
import gbflag from '../../images/flags/gb.png';

const flagForLocale = {
  ru: ruflag,
  en: gbflag,
};

export const Locale = () => {
  const {
    data: { locale },
  } = useQuery(GetLocaleQuery);
  return (
    <UncontrolledDropdown nav>
      <DropdownToggle nav>
        <img src={flagForLocale[locale]} alt="current locale" />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => setLocale('en')}>
          <img src={gbflag} alt="english locale" />
          English
        </DropdownItem>
        <DropdownItem onClick={() => setLocale('ru')}>
          <img src={ruflag} alt="russian locale" />
          Русский
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default Locale;
