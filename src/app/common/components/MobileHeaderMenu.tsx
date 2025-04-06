import React from 'react';
import MobileMenuIcon from './MobileMenuIcon';
import HomeButton from './HomeButton';
import { mobileHeaderLinks } from '../constants/header-links';

const MobileHeaderMenu = () => {
  return (
    <div className='navbar-start'>
      <div className='dropdown'>
        <MobileMenuIcon />
        <ul
          tabIndex={0}
          className='menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 bg-main-blue-200 p-2 shadow'
        >
          {mobileHeaderLinks.map((link) => (
            <li key={link.key}>{link}</li>
          ))}
        </ul>
      </div>
      <HomeButton />
    </div>
  );
};

export default MobileHeaderMenu;
